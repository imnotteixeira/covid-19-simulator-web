import React from "react";
import {
    makeStyles,
    Typography,
    Popover,
    IconButton,
    FormGroup,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    formGroup: {
        alignItems: "center",
        minWidth: "200px",
        flexWrap: "nowrap",
        justifyContent: "space-between",
    },
    popover: {
        padding: theme.spacing(1, 2),
    },
}));

const InputWithInfo = ({
    Input,
    hideHelpBtn = false,
    onHelpClick,
    onClose,
    openPopover,
    anchorEl,
    info,
    helperId,
}) => {
    const classes = useStyles();
    return (
        <>
            <FormGroup
                row
                className={classes.formGroup}
            >
                {Input}
                {!hideHelpBtn &&
                <IconButton
                    onClick={onHelpClick}
                >
                    <Info/>
                </IconButton>
                }
            </FormGroup>
            <Popover
                id={helperId}
                classes={{
                    paper: classes.popover,
                }}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                }}
            >
                <Typography variant="caption">
                    {info}
                </Typography>
            </Popover>
        </>
    );
};

export default InputWithInfo;
