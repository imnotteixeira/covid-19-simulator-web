// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { init, simulate, MetricsService } = require("@imnotteixeira/covid-19-simulator");

export default (req, res) => {
    try {
        MetricsService.subscribe("carrier-count");
        MetricsService.subscribe("dead-count");
        MetricsService.subscribe("cured-count");
        MetricsService.subscribe("hospitalized-count");
        const { populationSize,
            spreadRadius,
            hygieneDisregard,
            hospitalEffectiveness,
            hospitalCapacity,
            maxSteps,
        } = req.query;

        const simulationData = init({
            populationSize,
            spreadRadius,
            hygieneDisregard,
            hospitalEffectiveness,
            hospitalCapacity,
        });

        console.log(maxSteps);
        simulate(simulationData, parseInt(maxSteps, 10), {
            stepEnd: (simulationData) => {
                // console.log(simulationData.step);
            },
        });

        const metricValues = MetricsService.export();
        for (const metric of metricValues) {
            console.info(`[${metric.id}] ${metric.data}`);
        }
        res.json({ name: "John Doe" });
    } catch (e) {
        res.status(500).json({ error: e });
    } finally {
        MetricsService.unsubscribe("carrier-count");
        MetricsService.unsubscribe("dead-count");
        MetricsService.unsubscribe("cured-count");
        MetricsService.unsubscribe("hospitalized-count");

    }
};
