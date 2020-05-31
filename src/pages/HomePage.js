import React, { useState } from "react";
import SimulationController from "../components/HomePage/SimulationController";
import DataVisualizer from "../components/HomePage/DataVisualizer";
import InputView from "../components/HomePage/InputView";

const HomePage = () => {
    const [simulationState, setSimulationState] = useState(null);
    const [metricData, setMetricData] = useState(null);
    const [maxSteps, setMaxSteps] = useState(null);

    const [viewStep, setViewStep] = useState(0);

    const onSimulationReady = (simulationState) => {
        setSimulationState(simulationState);
        setViewStep(1);
    };
    return (
        <>
            <InputView
                activeStep={viewStep}
                setActiveStep={setViewStep}
                onSimulationReady={onSimulationReady}
                maxSteps={maxSteps}
                setMaxSteps={setMaxSteps}
            />

            {viewStep === 1 &&
                <SimulationController
                    autoStart
                    autoPlay
                    simulationState={simulationState}
                    setSimulationState={setSimulationState}
                    maxSteps={maxSteps}
                    setMetricData={setMetricData}
                />
            }
            {viewStep > 0 &&
                <DataVisualizer simulationState={simulationState} metricData={metricData}/>
            }
        </>
    );
};

export default HomePage;
