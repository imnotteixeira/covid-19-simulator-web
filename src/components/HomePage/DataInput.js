import React, { useState } from "react";
import { init } from "../../services/simulate";
import { QuarantineTypes } from "@imnotteixeira/covid-19-simulator";
import {
    makeStyles,
    Slider,
    Grid,
    Typography,
    Popover,
    IconButton,
    TextField,
    FormGroup,
    InputAdornment,
    Button,
    MenuItem,
} from "@material-ui/core";

import { Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        padding: theme.spacing(2),
    },
    selector: {
        width: "100%",
    },
    formGroup: {
        alignItems: "center",
        minWidth: "200px",
        flexWrap: "nowrap",
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
    const [hospitalCapacityPercentage, setHospitalCapacityPercentage] = useState(0);
    const [populationSize, setPopulationSize] = useState(0);
    const [incubationPeriod, setIncubationPeriod] = useState(6);
    const [infectionPeriod, setInfectionPeriod] = useState(41);
    const [spreadRadius, setSpreadRadius] = useState(1);
    const [testRate, setTestRate] = useState(0);
    const [testCooldown, setTestCooldown] = useState(1);
    const [quarantineType, setQuarantineType] = useState(QuarantineTypes.NONE);

    const [openHelpers, setOpenHelpers] = useState({
        hygieneDisregard: false,
        hospitalEffectiveness: false,
        hospitalCapacity: false,
        maxSteps: false,
        populationSize: false,
        incubationPeriod: false,
        infectionPeriod: false,
        spreadRadius: false,
        testRate: false,
        testCooldown: false,
        quarantineType: false,
    });

    const setInputs = () => {
        const simulationState = init({
            populationSize,
            hospitalEffectiveness,
            hygieneDisregard,
            hospitalCapacity: Math.floor(populationSize * hospitalCapacityPercentage / 100),
            incubationPeriod,
            infectionPeriod,
            spreadRadius,
            testRate: Math.floor(testRate * hospitalCapacityPercentage / 100),
            testCooldown,
            quarantineType,
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

    const handleSelectorChange = (setter) => (e) => {
        setter(e.target.value);
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
        <>
            <Grid container className={classes.gridWrapper} spacing={4}>
                <Grid item xs={12} md={12}>
                    <div style={{ display: "flex", justifyContent: "center" }}>

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
                    </div>

                </Grid>
            </Grid>
            <Grid container className={classes.gridWrapper} spacing={4}>
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
                                max={10000}
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

                    <Typography>
                        {`Hospital Capacity - ${hospitalCapacityPercentage}%`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={hospitalCapacityPercentage}
                                onChange={handleSliderChange(setHospitalCapacityPercentage)}
                                aria-labelledby="hospital-capacity"
                                aria-describedby="hospital-capacity-help"
                                max={100}
                                min={0}
                                step={0.1}
                            />
                        }
                        helperId="hospital-capacity-help"
                        onHelpClick={handleHelperClick("hospitalCapacity")}
                        onClose={handleHelperClose("hospitalCapacity")}
                        openPopover={openHelpers.hospitalCapacity}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>Defines the capacity of the Hospitals.</p>
                                <p>
                                    {"It's defined as a percentage of total initial population. "}
                                    The higher, the more people can be hosptalized at once.
                                </p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {`Incubation Period - ${incubationPeriod}`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={incubationPeriod}
                                onChange={handleSliderChange(setIncubationPeriod)}
                                aria-labelledby="incubation-period"
                                aria-describedby="incubation-period-help"
                                max={50}
                                min={1}
                                step={1}
                            />
                        }
                        helperId="incubation-period-help"
                        onHelpClick={handleHelperClick("incubationPeriod")}
                        onClose={handleHelperClose("incubationPeriod")}
                        openPopover={openHelpers.incubationPeriod}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>Defines the amount of steps until the symptoms begin.</p>
                                <p>Non-tested carriers can only be hospitalized after this period.</p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {`Infection Period - ${infectionPeriod}`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={infectionPeriod}
                                onChange={handleSliderChange(setInfectionPeriod)}
                                aria-labelledby="infection-period"
                                aria-describedby="infection-period-help"
                                max={100}
                                min={2}
                                step={1}
                            />
                        }
                        helperId="infection-period-help"
                        onHelpClick={handleHelperClick("infectionPeriod")}
                        onClose={handleHelperClose("infectionPeriod")}
                        openPopover={openHelpers.infectionPeriod}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>Defines the maximum disease period in steps.</p>
                                <p>Should be higher than the incubation period.</p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {`Spread Radius - ${spreadRadius}`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={spreadRadius}
                                onChange={handleSliderChange(setSpreadRadius)}
                                aria-labelledby="spread-radius"
                                aria-describedby="spread-radius-help"
                                max={Math.sqrt(populationSize) / 2}
                                min={1}
                                step={1}
                            />
                        }
                        helperId="spread-radius-help"
                        onHelpClick={handleHelperClick("spreadRadius")}
                        onClose={handleHelperClose("spreadRadius")}
                        openPopover={openHelpers.spreadRadius}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>Defines the spread radius from a carrier to other individuals.</p>
                                <p>The higher, the more people can be infected by a carrier at once.</p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {`Test Rate - ${testRate}%`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={testRate}
                                onChange={handleSliderChange(setTestRate)}
                                aria-labelledby="test-rate"
                                aria-describedby="test-rate-help"
                                max={100}
                                min={0}
                                step={0.1}
                            />
                        }
                        helperId="test-rate-help"
                        onHelpClick={handleHelperClick("testRate")}
                        onClose={handleHelperClose("testRate")}
                        openPopover={openHelpers.testRate}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>Defines the amount of tests done per day.</p>
                                <p>
                                    {"It's defined as a percentage of the total initial population"}
                                </p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {`Test Cooldown - ${testCooldown}`}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <Slider
                                className={classes.slider}
                                value={testCooldown}
                                onChange={handleSliderChange(setTestCooldown)}
                                aria-labelledby="test-cooldown"
                                aria-describedby="test-cooldown-help"
                                max={100}
                                min={2}
                                step={1}
                            />
                        }
                        helperId="test-cooldown-help"
                        onHelpClick={handleHelperClick("testCooldown")}
                        onClose={handleHelperClose("testCooldown")}
                        openPopover={openHelpers.testCooldown}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>
                                    Defines the amount of days the individual must wait
                                    after being tested before being able to be tested again.
                                </p>
                            </>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography>
                        {"Quarantine Type"}
                    </Typography>
                    <InputWithInfo
                        Input={
                            <TextField
                                select
                                value={quarantineType}
                                className={classes.selector}
                                onChange={handleSelectorChange(setQuarantineType)}
                                aria-labelledby="quarantine-type"
                                aria-describedby="quarantine-type-help"
                            >
                                {Object.entries(QuarantineTypes).map(([key, value]) => (
                                    <MenuItem key={key} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                        helperId="quarantine-type-help"
                        onHelpClick={handleHelperClick("quarantineType")}
                        onClose={handleHelperClose("quarantineType")}
                        openPopover={openHelpers.quarantineType}
                        anchorEl={anchorEl}
                        info={
                            <>
                                <p>
                                    Defines the quarantine behavior of the population.
                                </p>
                                <p>
                                    <b>NONE</b>
                                    {" "}
                                    No individual will enter quarantine.
                                </p>
                                <p>
                                    <b>FIXED_PERCENTAGE</b>
                                    {" "}
                                    A specified fixed percentage of the population will enter quarantine after the specified delay,
                                    for the specified duration.
                                </p>
                                <p>
                                    <b>CONFIRMED_CARRIERS_ONLY</b>
                                    {" "}
                                    Only the confirmed carriers will enter quarantine, and only leave once they are cured.
                                </p>
                            </>
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={setInputs}>Initialize</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default DataInput;
