import React from "react";

import {
    Typography,
    TextField,
    MenuItem,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";
import { QuarantineTypes } from "@imnotteixeira/covid-19-simulator";


const QuarantineType = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen, className }) => (
    <>
        <Typography>
            {"Quarantine Type"}
        </Typography>
        <InputWithInfo
            Input={
                <TextField
                    select
                    className={className}
                    value={value}
                    onChange={onChange}
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
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
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
    </>
);

export default QuarantineType;
