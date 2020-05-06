import React from "react";
import { init, MetricsService } from "../../services/simulate";

const DataInput = ({ setSimulationState, setMaxSteps }) => {
    const setInputs = () => {
        const simulationState = init({
            populationSize: 10000,
            hospitalCapacity: 100,
            hospitalEffectiveness: 0.8,
            hygieneDisregard: 0.05,
            incubationPeriod: 6,
            infectionPeriod: 41,
            spreadRadius: 3,
        });

        setSimulationState(simulationState);

        MetricsService.subscribe("carrier-count");
        MetricsService.subscribe("dead-count");
        MetricsService.subscribe("cured-count");
        MetricsService.subscribe("hospitalized-count");
        MetricsService.subscribe("healthy-count");
    };

    const handleMaxStepsChange = (e) => {
        const maxSteps = e.target.value;

        if (maxSteps !== "") setMaxSteps(parseInt(maxSteps, 10));
        else setMaxSteps(null);
    };

    return (
        <div>
            <p>Make me have inputs to customize stuff</p>
            <label>
                Max Steps:
                <input onChange={handleMaxStepsChange} type="number"/>
            </label>
            <button onClick={setInputs}>Set Inputs</button>
        </div>
    );
};

export default DataInput;
