import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";


const InputRHF = (props) => {
    const { inputProps, label, required, name, control, sx, placeholder, color, disabled } = props;
    const { field, fieldState: { invalid, error } } = useController({ name, control });
    const { ref } = field;

    return (
        <TextField
            {...field}
            autoComplete="off"
            disabled={disabled ? true : false}
            inputProps={{ ...inputProps }}
            inputRef={ref}
            label={label}
            error={invalid}
            helperText={error?.message}
            required={Boolean(required)}
            placeholder={placeholder}
            sx={{ ...sx }}
            color={color}
        />
    )
}
export default InputRHF; 