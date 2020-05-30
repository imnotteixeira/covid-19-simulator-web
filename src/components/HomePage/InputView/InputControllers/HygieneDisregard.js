import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const HygieneDisregard = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Hygiene Disregard - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="hygiene-disregard"
                    aria-describedby="hygiene-disregard-help"
                    max={1}
                    min={0}
                    step={0.01}
                />
            }
            helperId="hygiene-disregard-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines how the population disregards hygiene recommendations.</p>
                    <p>Higher values promote higher transmission rate.</p>
                </>
            }
        />
    </>
);

export default HygieneDisregard;
