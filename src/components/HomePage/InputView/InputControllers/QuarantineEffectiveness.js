import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const QuarantineEffectiveness = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Quarantine Effectiveness - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="quarantine-effectiveness"
                    aria-describedby="quarantine-effectiveness-help"
                    max={1}
                    min={0}
                    step={0.01}
                />
            }
            helperId="quarantine-effectiveness-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines how safe the quarantine is.</p>
                    <p>Higher values reduce the transmission rate.</p>
                </>
            }
        />
    </>
);

export default QuarantineEffectiveness;
