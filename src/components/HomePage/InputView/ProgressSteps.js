import React from "react";
import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";

const STEPS = Object.freeze([
    "Select the input values for the simulation",
    "Simulating...",
    "Analyse the results",
]);

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(4, 0),
    },
}));

const ProgressSteps = ({ activeStep }) => {
    const classes = useStyles();
    return (
        <div className={classes.stepper}>
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
};

export default ProgressSteps;
