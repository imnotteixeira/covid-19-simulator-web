import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const SpreadRadius = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen, max }) => (
    <>
        <Typography>
            {`Spread Radius - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="spread-radius"
                    aria-describedby="spread-radius-help"
                    max={max}
                    min={1}
                    step={1}
                />
            }
            helperId="spread-radius-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines the spread radius from a carrier to other individuals.</p>
                    <p>The higher, the more people can be infected by a carrier at once.</p>
                </>
            }
        />
    </>
);

export default SpreadRadius;
