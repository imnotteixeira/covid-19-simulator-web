import React, { useState, useEffect } from "react";
import { simulate, MetricsService } from "../../services/simulate";

const SimulationController = ({ simulationState, setSimulationState, maxSteps, setMetricData }) => {


    const [step, setStep] = useState(0);
    const [simulationRunning, setSimulationRunning] = useState(false);

    useEffect(() => {

        if (simulationState && !simulationState.ended && simulationRunning) {
            const newState = simulate(simulationState, maxSteps);
            setSimulationState(newState);
            setStep(simulationState.step);


            const metrics = MetricsService.export().map(({ data, id }) => ({
                id,
                data: data.map((val, i) => ({ x: i, y: val })),
            }));
            setMetricData(metrics);
        }

        if (simulationState && simulationState.ended) {
            setSimulationRunning(false);
        }

    }, [step, simulationState, simulationRunning, maxSteps, setSimulationState, setMetricData]);

    const startSimulation = () => {
        setSimulationRunning(true);
    };

    return (
        <div>
            <p>
                {`Step: ${step}`}
            </p>
            <button
                onClick={startSimulation}
                disabled={!simulationState || (simulationRunning && !simulationState.ended)}
            >
                Start Simulation
            </button>
        </div>
    );
};

export default SimulationController;
