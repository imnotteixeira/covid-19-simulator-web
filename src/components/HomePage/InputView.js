import React from "react";
import ProgressSteps from "./InputView/ProgressSteps";
import DataInput from "./DataInput";


const InputView = ({ maxSteps, setMaxSteps, onSimulationReady }) => (
    <React.Fragment>

        <ProgressSteps activeStep={0}/>
        <DataInput
            onSimulationReady={onSimulationReady}
            maxSteps={maxSteps}
            setMaxSteps={setMaxSteps}
        />
    </React.Fragment>
);

export default InputView;
