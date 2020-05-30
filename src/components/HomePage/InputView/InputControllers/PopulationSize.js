import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const PopulationSize = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Population Size - ${value}`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="population-size"
                    aria-describedby="population-size-help"
                    max={10000}
                    min={0}
                    step={null}
                    marks={[
                        { value: 0 },
                        { value: 100 },
                        { value: 400 },
                        { value: 900 },
                        { value: 1600 },
                        { value: 2500 },
                        { value: 10000 },
                    ]}
                />
            }
            helperId="population-size-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Amount of population individuals.</p>
                    <p>Must be a perfect square in order to simulate the square matrix.</p>
                </>
            }
        />
    </>
);

export default PopulationSize;
