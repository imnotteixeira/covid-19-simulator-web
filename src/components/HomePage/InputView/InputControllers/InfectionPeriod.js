import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const InfectionPeriod = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Infection Period - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="infection-period"
                    aria-describedby="infection-period-help"
                    max={100}
                    min={2}
                    step={1}
                />
            }
            helperId="infection-period-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines the maximum disease period in steps.</p>
                    <p>Should be higher than the incubation period.</p>
                </>
            }
        />
    </>
);

export default InfectionPeriod;
