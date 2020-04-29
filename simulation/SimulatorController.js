const { init, simulate: runSimulation, MetricsService } = require("@imnotteixeira/covid-19-simulator");

const simulate = (params, hooks) => {
    try {
        MetricsService.subscribe("carrier-count");
        MetricsService.subscribe("dead-count");
        // MetricsService.subscribe("cured-count");
        MetricsService.subscribe("hospitalized-count");
        const { populationSize,
            spreadRadius,
            hygieneDisregard,
            hospitalEffectiveness,
            hospitalCapacity,
            incubationPeriod,
            infectionPeriod,
            maxSteps,
        } = params;

        const simulationData = init({
            populationSize,
            spreadRadius,
            hygieneDisregard,
            hospitalEffectiveness,
            hospitalCapacity,
            incubationPeriod,
            infectionPeriod,
        });

        runSimulation(simulationData, parseInt(maxSteps, 10), hooks);

    } catch (e) {
        console.error(e);
    } finally {
        MetricsService.unsubscribe("carrier-count");
        MetricsService.unsubscribe("dead-count");
        // MetricsService.unsubscribe("cured-count");
        MetricsService.unsubscribe("hospitalized-count");
    }

    MetricsService.clear();
};


class SimulatorController {
    constructor(socket) {
        this.socket = socket;

        this.disconnected = false;

        this._setupControls();
    }

    _setupControls() {
        this.socket.on("init", (params) => {
            const start = process.hrtime.bigint();
            simulate(params, {
                stepEnd: (simulationData) => {
                    // Sending whole simulationData is too much info, can be overkill for large populations
                    // this.socket.emit("step-update", simulationData);

                    const metricData = MetricsService.export();
                    for (const metric of metricData) {
                        metric.data = metric.data.map((val, i) => ({ x: i, y: val }));
                    }
                    this.socket.emit("metric-update", metricData);
                },
            });
            const elapsedTime = process.hrtime.bigint() - start;

            this.socket.emit("simulation-end", { elapsedTime: parseFloat(elapsedTime / BigInt(1e6)) });
        });
    }

    onDisconnect() {
        this.disconnected = true;
    }

}

module.exports = SimulatorController;
