import React from "react";

import {
    Slider,
    Typography,
} from "@material-ui/core";
import InputWithInfo from "../InputWithInfo";

const HospitalCapacity = ({ value, onChange, onHelpClose, onHelpOpen, helpAnchorEl, isHelpOpen }) => (
    <>
        <Typography>
            {`Hospital Capacity - ${value}%`}
        </Typography>
        <InputWithInfo
            Input={
                <Slider
                    value={value}
                    onChange={onChange}
                    aria-labelledby="hospital-capacity"
                    aria-describedby="hospital-capacity-help"
                    max={100}
                    min={0}
                    step={0.1}
                />
            }
            helperId="hospital-capacity-help"
            onHelpClick={onHelpOpen}
            onClose={onHelpClose}
            openPopover={isHelpOpen}
            anchorEl={helpAnchorEl}
            info={
                <>
                    <p>Defines the capacity of the Hospitals.</p>
                    <p>
                        {"It's defined as a percentage of total initial population. "}
                        The higher, the more people can be hosptalized at once.
                    </p>
                </>
            }
        />
    </>
);

export default HospitalCapacity;
