import React, { useState } from "react";
import { init } from "../../services/simulate";
import { QuarantineTypes } from "@imnotteixeira/covid-19-simulator";
import {
    makeStyles,
    Paper,
    Slider,
    Grid,
    Typography,
    Popover,
    IconButton,
    TextField,
    FormGroup,
    InputAdornment,
    Button,
} from "@material-ui/core";

import { Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    input: {
        // marginRight: theme.spacing(1.5),
    },
    slider: {
        maxWidth: "85%",
    },
    formGroup: {
        alignItems: "center",
        minWidth: "200px",
        justifyContent: "space-between",
    },
    popover: {
        padding: theme.spacing(1, 2),
    },
}));

const InputWithInfo = ({
    Input,
    hideHelpBtn = false,
    onHelpClick,
    onClose,
    openPopover,
    anchorEl,
    info,
    helperId,
}) => {
    const classes = useStyles();
    return (
        <>
            <FormGroup
                row
                className={classes.formGroup}
            >
                {Input}
                {!hideHelpBtn &&
                <IconButton
                    onClick={onHelpClick}
                >
                    <Info/>
                </IconButton>
                }
            </FormGroup>
            <Popover
                id={helperId}
                classes={{
                    paper: classes.popover,
                }}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                }}
            >
                <Typography variant="caption">
                    {info}
                </Typography>
            </Popover>
        </>
    );
};

const DataInput = ({ setSimulationState, maxSteps, setMaxSteps }) => {

    const classes = useStyles();
    const [hygieneDisregard, setHygieneDisregard] = useState(0);
    const [hospitalEffectiveness, setHospitalEffectiveness] = useState(0);
    // const [hospitalCapacity, setHospitalCapacity] = useState(0);
    const [populationSize, setPopulationSize] = useState(0);
    const [openHelpers, setOpenHelpers] = useState({
        hygieneDisregard: false,
        hospitalEffectiveness: false,
        hospitalCapacity: false,
        maxSteps: false,
        populationSize: false,
    });

    const setInputs = () => {
        const simulationState = init({
            populationSize,
            hospitalEffectiveness,
            hygieneDisregard,
            hospitalCapacity: 100,
            incubationPeriod: 6,
            infectionPeriod: 141,
            spreadRadius: 10,
            quarantineType: QuarantineTypes.FIXED_PERCENTAGE,
            quarantineEffectiveness: 0.5,
            quarantinePercentage: 0.9,
            quarantineDelay: 2,
            quarantinePeriod: 15,
        });

        setSimulationState(simulationState);
    };

    const handleMaxStepsChange = (e) => {
        const maxSteps = e.target.value;

        if (maxSteps !== "") setMaxSteps(parseInt(maxSteps, 10));
        else setMaxSteps(null);
    };

    const handleSliderChange = (setter) => (event, newValue) => {
        setter(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleHelperClick = (helperId) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpenHelpers((openHelpers) => ({
            ...openHelpers,
            [helperId]: true,
        }));

    };

    const handleHelperClose = (helperId) => () => {
        setOpenHelpers((openHelpers) => ({
            ...openHelpers,
            [helperId]: false,
        }));
    };

    return (
        <Grid container justify="center">
            <Grid item xs={12} sm={6}>

                <Paper elevation={2} className={classes.paper}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography>
                                {`Hygiene Disregard - ${hygieneDisregard}`}
                            </Typography>
                            <InputWithInfo
                                Input={
                                    <Slider
                                        className={classes.slider}
                                        value={hygieneDisregard}
                                        onChange={handleSliderChange(setHygieneDisregard)}
                                        aria-labelledby="hygiene-disregard"
                                        aria-describedby="hygiene-disregard-help"
                                        max={1}
                                        min={0}
                                        step={0.01}
                                    />
                                }
                                helperId="hygiene-disregard-help"
                                onHelpClick={handleHelperClick("hygieneDisregard")}
                                onClose={handleHelperClose("hygieneDisregard")}
                                openPopover={openHelpers.hygieneDisregard}
                                anchorEl={anchorEl}
                                info={
                                    <>
                                        <p>Defines how the population disregards hygiene recommendations.</p>
                                        <p>Higher values promote higher transmission rate.</p>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <Typography>
                                {`Hospital Effectiveness - ${hospitalEffectiveness}`}
                            </Typography>
                            <InputWithInfo
                                Input={
                                    <Slider
                                        className={classes.slider}
                                        value={hospitalEffectiveness}
                                        onChange={handleSliderChange(setHospitalEffectiveness)}
                                        aria-labelledby="hospital-effectiveness"
                                        aria-describedby="hospital-effectiveness-help"
                                        max={1}
                                        min={0}
                                        step={0.01}
                                    />
                                }
                                helperId="hospital-effectiveness-help"
                                onHelpClick={handleHelperClick("hospitalEffectiveness")}
                                onClose={handleHelperClose("hospitalEffectiveness")}
                                openPopover={openHelpers.hospitalEffectiveness}
                                anchorEl={anchorEl}
                                info={
                                    <>
                                        <p>Defines how much the hospital stay prevents death.</p>
                                        <p>Lower values mean lower death probability.</p>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <Typography>
                                {`Population Size - ${populationSize}`}
                            </Typography>
                            <InputWithInfo
                                Input={
                                    <Slider
                                        className={classes.slider}
                                        value={populationSize}
                                        onChange={handleSliderChange(setPopulationSize)}
                                        aria-labelledby="population-size"
                                        aria-describedby="population-size-help"
                                        max={90000}
                                        min={0}
                                        step={null}
                                        marks={[
                                            { value: 0 },
                                            { value: 100 },
                                            { value: 400 },
                                            { value: 900 },
                                            { value: 1600 },
                                            { value: 2500 },
                                            { value: 10000 },
                                            { value: 90000 },
                                        ]}
                                    />
                                }
                                helperId="population-size-help"
                                onHelpClick={handleHelperClick("populationSize")}
                                onClose={handleHelperClose("populationSize")}
                                openPopover={openHelpers.populationSize}
                                anchorEl={anchorEl}
                                info={
                                    <>
                                        <p>Amount of population individuals.</p>
                                        <p>Must be a perfect square in order to simulate the square matrix.</p>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <InputWithInfo
                                Input={
                                    <TextField
                                        className={classes.input}
                                        value={maxSteps || ""}
                                        onChange={handleMaxStepsChange}
                                        aria-labelledby="max-steps"
                                        aria-describedby="max-steps-help"
                                        label="Max Steps"
                                        type="number"
                                        inputProps={{
                                            min: 0,
                                        }}
                                        InputProps={{
                                            endAdornment:
    <InputAdornment position="end">
        <IconButton
            edge="end"
            onClick={handleHelperClick("maxSteps")}
        >
            <Info/>
        </IconButton>
    </InputAdornment>,
                                        }}
                                    />
                                }
                                hideHelpBtn
                                helperId="max-steps-help"
                                onClose={handleHelperClose("maxSteps")}
                                openPopover={openHelpers.maxSteps}
                                anchorEl={anchorEl}
                                info={
                                    <>
                                        <p>Sets a maximum number of steps for the simulation run.</p>
                                        <p>It will forcefully break the simulation after the amount of steps have passed</p>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" onClick={setInputs}>Initialize</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DataInput;
