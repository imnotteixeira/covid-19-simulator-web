import React, { useState } from "react";
import DataInput from "../components/HomePage/DataInput";
import SimulationController from "../components/HomePage/SimulationController";
import DataVisualizer from "../components/HomePage/DataVisualizer";

const HomePage = () => {
    const [simulationState, setSimulationState] = useState(null);
    const [metricData, setMetricData] = useState(null);
    const [maxSteps, setMaxSteps] = useState(null);
    return (
        <>
            <DataInput setSimulationState={setSimulationState} setMaxSteps={setMaxSteps}/>
            <SimulationController
                autoPlay={false}
                simulationState={simulationState}
                setSimulationState={setSimulationState}
                maxSteps={maxSteps}
                setMetricData={setMetricData}
            />
            <DataVisualizer simulationState={simulationState} metricData={metricData}/>
        </>
    );
};

export default HomePage;
