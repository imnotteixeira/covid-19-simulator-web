import React from "react";

import {
    InputAdornment,
    IconButton,
    TextField,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";
import { Info } from "@material-ui/icons";

const MaxSteps = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <InputWithInfo
        Input={
            <TextField
                value={value}
                onChange={onChange}
                aria-labelledby="max-steps"
                aria-describedby="max-steps-help"
                label="Max Steps"
                type="number"
                inputProps={{
                    min: 0,
                }}
                InputProps={{
                    endAdornment:
                        // eslint-disable-next-line react/jsx-indent
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={onHelpOpen}
                            >
                                <Info/>
                            </IconButton>
                        </InputAdornment>,
                }}
            />
        }
        hideHelpBtn
        helperId="max-steps-help"
        onClose={onHelpClose}
        openPopover={isHelpOpen}
        anchorEl={helpAnchorEl}
        info={
            <>
                <p>Sets a maximum number of steps for the simulation run.</p>
                <p>It will forcefully break the simulation after the amount of steps have passed</p>
            </>
        }
    />
);

export default MaxSteps;
