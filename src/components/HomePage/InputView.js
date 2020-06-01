import React from "react";
import DataInput from "./DataInput";


const InputView = ({ maxSteps, setMaxSteps, onSimulationReady }) => (
    <React.Fragment>

        <DataInput
            onSimulationReady={onSimulationReady}
            maxSteps={maxSteps}
            setMaxSteps={setMaxSteps}
        />
    </React.Fragment>
);

export default InputView;
