import React from "react";
import ProgressSteps from "./InputView/ProgressSteps";
import DataInput from "./DataInput";


const InputView = ({ maxSteps, setMaxSteps, setSimulationState }) => (
    <React.Fragment>

        <ProgressSteps activeStep={0}/>
        <DataInput
            setSimulationState={setSimulationState}
            maxSteps={maxSteps}
            setMaxSteps={setMaxSteps}
        />
    </React.Fragment>
);

export default InputView;
