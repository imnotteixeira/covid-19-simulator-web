import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const QuarantineDelay = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Quarantine Delay - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="quarantine-delay"
                    aria-describedby="quarantine-delay-help"
                    max={50}
                    min={1}
                    step={1}
                />
            }
            helperId="quarantine-delay-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <p>Defines how many days pass before the population starts the general quarantine.</p>
            }
        />
    </>
);

export default QuarantineDelay;
