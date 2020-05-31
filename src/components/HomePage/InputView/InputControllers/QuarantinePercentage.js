import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const QuarantinePercentage = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Quarantine Percentage - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="quarantine-percentage"
                    aria-describedby="quarantine-percentage-help"
                    max={1}
                    min={0}
                    step={0.01}
                />
            }
            helperId="quarantine-percentage-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <p>Defines what portion of the population will enter the quarantine no matter what.</p>
            }
        />
    </>
);

export default QuarantinePercentage;
