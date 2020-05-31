import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const QuarantinePeriod = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Quarantine Period - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="quarantine-period"
                    aria-describedby="quarantine-period-help"
                    max={50}
                    min={1}
                    step={1}
                />
            }
            helperId="quarantine-period-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <p>Defines how many days the population will stay in quarantine.</p>
            }
        />
    </>
);

export default QuarantinePeriod;
