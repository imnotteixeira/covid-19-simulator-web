import React, { useState, useEffect, useCallback } from "react";
import { simulate, MetricsService } from "../../services/simulate";

const SimulationController = ({
    simulationState,
    setSimulationState,
    maxSteps,
    setMetricData,
    autoPlay,
}) => {

    const [step, setStep] = useState(0);
    const [simulationRunning, setSimulationRunning] = useState(false);

    const simulateNextState = useCallback(
        () => {

            if (simulationState.ended) return;

            setStep(simulationState.step);
            const newState = simulate(simulationState, maxSteps);
            setSimulationState(newState);

            const metrics = MetricsService.export().map(({ data, id }) => ({
                id,
                data: data.map((val, i) => ({ x: i, y: val })),
            }));
            setMetricData(metrics);
        },
        [maxSteps, simulationState, setSimulationState, setMetricData],
    );

    useEffect(() => {

        if (simulationState && !simulationState.ended && simulationRunning && autoPlay) {
            simulateNextState();
        }

        if (simulationState && simulationState.ended) {
            setSimulationRunning(false);
        }

    }, [
        step,
        simulationState,
        simulationRunning,
        autoPlay,
        simulateNextState,
    ]);

    const startSimulation = () => {
        setSimulationRunning(true);
    };


    return (
        <div>
            <p>
                {`Step: ${step}`}
            </p>
            {autoPlay ?
                <button
                    onClick={startSimulation}
                    disabled={!simulationState || (simulationRunning && !simulationState.ended)}
                >
                    Start Simulation
                </button>

                :
                <button
                    onClick={simulateNextState}
                    disabled={!simulationState || (simulationRunning && !simulationState.ended)}
                >
                    Next Step
                </button>
            }

        </div>
    );
};

export default SimulationController;
