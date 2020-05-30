import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const HospitalEffectiveness = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Hospital Effectiveness - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="hospital-effectiveness"
                    aria-describedby="hospital-effectiveness-help"
                    max={1}
                    min={0}
                    step={0.01}
                />
            }
            helperId="hospital-effectiveness-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines how much the hospital stay prevents death.</p>
                    <p>Lower values mean lower death probability.</p>
                </>
            }
        />
    </>
);

export default HospitalEffectiveness;
