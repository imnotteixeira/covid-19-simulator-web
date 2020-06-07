import React, { useState, useEffect, useCallback } from "react";
import { simulate, MetricsService } from "../../services/simulate";

const SimulationController = ({
    simulationState,
    setSimulationState,
    maxSteps,
    setMetricData,
    autoPlay,
    autoStart,
    onSimulationEnded,
}) => {

    const [step, setStep] = useState(0);
    const [simulationRunning, setSimulationRunning] = useState(autoStart);

    const simulateNextState = useCallback(
        () => {

            if (simulationState.ended) return;

            const newState = simulate(simulationState, maxSteps);
            setSimulationState(newState);
            setStep(newState.step);

            const metrics = MetricsService.export();
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
            onSimulationEnded();
        }

    }, [step, simulationState, simulationRunning, autoPlay, simulateNextState, onSimulationEnded]);

    const startSimulation = () => {
        setSimulationRunning(true);
    };


    return (
        <div>
            {autoPlay ?
                !autoStart &&
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
