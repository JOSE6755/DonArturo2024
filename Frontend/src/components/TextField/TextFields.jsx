import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
export default function TextFields({
  name,
  control,
  label,
  type,
  fullWidth,
  error,
  slotProps,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth={fullWidth}
          variant="standard"
          error={error[name] ? true : false}
          helperText={error[name] ? error[name].message : ""}
          slotProps={slotProps}
        ></TextField>
      )}
    />
  );
}

TextFields.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  error: PropTypes.object.isRequired,
  slotProps: PropTypes.object.isRequired,
};
