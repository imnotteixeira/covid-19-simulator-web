import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const TestRate = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Test Rate - ${value}%`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="test-rate"
                    aria-describedby="test-rate-help"
                    max={100}
                    min={0}
                    step={0.1}
                />
            }
            helperId="test-rate-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines the amount of tests done per day.</p>
                    <p>
                        {"It's defined as a percentage of the total initial population"}
                    </p>
                </>
            }
        />
    </>
);

export default TestRate;
