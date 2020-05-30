import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const IncubationPeriod = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Incubation Period - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="incubation-period"
                    aria-describedby="incubation-period-help"
                    max={50}
                    min={1}
                    step={1}
                />
            }
            helperId="incubation-period-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines the amount of steps until the symptoms begin.</p>
                    <p>Non-tested carriers can only be hospitalized after this period.</p>
                </>
            }
        />
    </>
);

export default IncubationPeriod;
