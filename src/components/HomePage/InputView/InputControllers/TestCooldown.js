import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const TestCooldown = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Test Cooldown - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="test-cooldown"
                    aria-describedby="test-cooldown-help"
                    max={100}
                    min={2}
                    step={1}
                />
            }
            helperId="test-cooldown-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>
                        Defines the amount of days the individual must wait
                        after being tested before being able to be tested again.
                    </p>
                </>
            }
        />
    </>
);

export default TestCooldown;
