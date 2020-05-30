import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";

const STEPS = Object.freeze([
    "Select the input values for the simulation",
    "Simulating...",
    "Analyse the results",
]);

const ProgressSteps = ({ activeStep }) => (
    <div>
        <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
                <Step key={label}>
                    <StepLabel>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
);

export default ProgressSteps;
