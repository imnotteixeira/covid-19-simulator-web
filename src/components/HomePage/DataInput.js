import React, { useState } from "react";
import { init } from "../../services/simulate";
import { QuarantineTypes } from "@imnotteixeira/covid-19-simulator";

import {
    makeStyles,
    Grid,
    Button,
    Collapse,
} from "@material-ui/core";

import HygieneDisregard from "./InputView/InputControllers/HygieneDisregard";
import HospitalEffectiveness from "./InputView/InputControllers/HospitalEffectiveness";
import PopulationSize from "./InputView/InputControllers/PopulationSize";
import HospitalCapacity from "./InputView/InputControllers/HospitalCapacity";
import IncubationPeriod from "./InputView/InputControllers/IncubationPeriod";
import InfectionPeriod from "./InputView/InputControllers/InfectionPeriod";
import SpreadRadius from "./InputView/InputControllers/SpreadRadius";
import TestRate from "./InputView/InputControllers/TestRate";
import TestCooldown from "./InputView/InputControllers/TestCooldown";
import QuarantineTypeSelector from "./InputView/InputControllers/QuarantineType";
import MaxSteps from "./InputView/InputControllers/MaxSteps";
import QuarantineEffectiveness from "./InputView/InputControllers/QuarantineEffectiveness";
import QuarantinePercentage from "./InputView/InputControllers/QuarantinePercentage";
import QuarantineDelay from "./InputView/InputControllers/QuarantineDelay";
import QuarantinePeriod from "./InputView/InputControllers/QuarantinePeriod";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(4),
    },
    gridWrapper: {
        padding: theme.spacing(2),
    },
    selector: {
        width: "100%",
    },
}));


const DataInput = ({ onSimulationReady, maxSteps, setMaxSteps }) => {

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
    const [quarantineEffectiveness, setQuarantineEffectiveness] = useState(0);
    const [quarantinePercentage, setQuarantinePercentage] = useState(0);
    const [quarantineDelay, setQuarantineDelay] = useState(0);
    const [quarantinePeriod, setQuarantinePeriod] = useState(0);
    const [openHelper, setOpenHelper] = useState("");

    const simulate = () => {
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
            quarantineEffectiveness,
            quarantinePercentage,
            quarantineDelay,
            quarantinePeriod,
        });


        onSimulationReady(simulationState);
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
        setOpenHelper(helperId);

    };

    // eslint-disable-next-line no-unused-vars
    const handleHelperClose = (helperId) => () => {
        setOpenHelper("");
    };

    return (
        <div className={classes.wrapper}>
            <Grid container className={classes.gridWrapper} spacing={4}>
                <Grid item xs={12} md={12}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <MaxSteps
                            value={maxSteps || ""}
                            onChange={handleMaxStepsChange}
                            isHelpOpen={openHelper === "maxSteps"}
                            onHelpClose={handleHelperClose("maxSteps")}
                            onHelpOpen={handleHelperClick("maxSteps")}
                            helpAnchorEl={anchorEl}
                        />
                    </div>

                </Grid>
            </Grid>
            <Grid container className={classes.gridWrapper} spacing={4}>
                <Grid item xs={12} md={6}>
                    <HygieneDisregard
                        value={hygieneDisregard}
                        onChange={handleSliderChange(setHygieneDisregard)}
                        isHelpOpen={openHelper === "hygieneDisregard"}
                        onHelpClose={handleHelperClose("hygieneDisregard")}
                        onHelpOpen={handleHelperClick("hygieneDisregard")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <HospitalEffectiveness
                        value={hospitalEffectiveness}
                        onChange={handleSliderChange(setHospitalEffectiveness)}
                        isHelpOpen={openHelper === "hospitalEffectiveness"}
                        onHelpClose={handleHelperClose("hospitalEffectiveness")}
                        onHelpOpen={handleHelperClick("hospitalEffectiveness")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PopulationSize
                        value={populationSize}
                        onChange={handleSliderChange(setPopulationSize)}
                        isHelpOpen={openHelper === "populationSize"}
                        onHelpClose={handleHelperClose("populationSize")}
                        onHelpOpen={handleHelperClick("populationSize")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <HospitalCapacity
                        value={hospitalCapacityPercentage}
                        onChange={handleSliderChange(setHospitalCapacityPercentage)}
                        isHelpOpen={openHelper === "hospitalCapacity"}
                        onHelpClose={handleHelperClose("hospitalCapacity")}
                        onHelpOpen={handleHelperClick("hospitalCapacity")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IncubationPeriod
                        value={incubationPeriod}
                        onChange={handleSliderChange(setIncubationPeriod)}
                        isHelpOpen={openHelper === "incubationPeriod"}
                        onHelpClose={handleHelperClose("incubationPeriod")}
                        onHelpOpen={handleHelperClick("incubationPeriod")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InfectionPeriod
                        value={infectionPeriod}
                        onChange={handleSliderChange(setInfectionPeriod)}
                        isHelpOpen={openHelper === "infectionPeriod"}
                        onHelpClose={handleHelperClose("infectionPeriod")}
                        onHelpOpen={handleHelperClick("infectionPeriod")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SpreadRadius
                        value={spreadRadius}
                        max={Math.sqrt(populationSize) / 2}
                        onChange={handleSliderChange(setSpreadRadius)}
                        isHelpOpen={openHelper === "spreadRadius"}
                        onHelpClose={handleHelperClose("spreadRadius")}
                        onHelpOpen={handleHelperClick("spreadRadius")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TestRate
                        value={testRate}
                        onChange={handleSliderChange(setTestRate)}
                        isHelpOpen={openHelper === "testRate"}
                        onHelpClose={handleHelperClose("testRate")}
                        onHelpOpen={handleHelperClick("testRate")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TestCooldown
                        value={testCooldown}
                        onChange={handleSliderChange(setTestCooldown)}
                        isHelpOpen={openHelper === "testCooldown"}
                        onHelpClose={handleHelperClose("testCooldown")}
                        onHelpOpen={handleHelperClick("testCooldown")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <QuarantineTypeSelector
                        className={classes.selector}
                        value={quarantineType}
                        onChange={handleSelectorChange(setQuarantineType)}
                        isHelpOpen={openHelper === "quarantineType"}
                        onHelpClose={handleHelperClose("quarantineType")}
                        onHelpOpen={handleHelperClick("quarantineType")}
                        helpAnchorEl={anchorEl}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: 0 }}>
                    <Collapse
                        in={quarantineType !== QuarantineTypes.NONE}
                    >
                        <Grid container className={classes.gridWrapper} spacing={4}>
                            <Grid item xs={12} md={6}>
                                <QuarantineEffectiveness
                                    value={quarantineEffectiveness}
                                    onChange={handleSliderChange(setQuarantineEffectiveness)}
                                    isHelpOpen={openHelper === "quarantineEffectiveness"}
                                    onHelpClose={handleHelperClose("quarantineEffectiveness")}
                                    onHelpOpen={handleHelperClick("quarantineEffectiveness")}
                                    helpAnchorEl={anchorEl}
                                />
                            </Grid>
                            {quarantineType === QuarantineTypes.FIXED_PERCENTAGE &&
                            <>
                                <Grid item xs={12} md={6}>
                                    <QuarantinePercentage
                                        value={quarantinePercentage}
                                        onChange={handleSliderChange(setQuarantinePercentage)}
                                        isHelpOpen={openHelper === "quarantinePercentage"}
                                        onHelpClose={handleHelperClose("quarantinePercentage")}
                                        onHelpOpen={handleHelperClick("quarantinePercentage")}
                                        helpAnchorEl={anchorEl}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <QuarantineDelay
                                        value={quarantineDelay}
                                        onChange={handleSliderChange(setQuarantineDelay)}
                                        isHelpOpen={openHelper === "quarantineDelay"}
                                        onHelpClose={handleHelperClose("quarantineDelay")}
                                        onHelpOpen={handleHelperClick("quarantineDelay")}
                                        helpAnchorEl={anchorEl}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <QuarantinePeriod
                                        value={quarantinePeriod}
                                        onChange={handleSliderChange(setQuarantinePeriod)}
                                        isHelpOpen={openHelper === "quarantinePeriod"}
                                        onHelpClose={handleHelperClose("quarantinePeriod")}
                                        onHelpOpen={handleHelperClick("quarantinePeriod")}
                                        helpAnchorEl={anchorEl}
                                    />
                                </Grid>
                            </>
                            }
                        </Grid>
                    </Collapse>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={simulate}>Simulate</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default DataInput;
