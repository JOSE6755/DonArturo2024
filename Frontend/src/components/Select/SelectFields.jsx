import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function SelectFields({
  name,
  label,
  control,
  fullWidth,
  error,
  items,
}) {
  console.log(items);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth={fullWidth}
          variant="standard"
          select
          defaultValue="None"
          error={error[name] ? true : false}
          helperText={error[name] ? error[name].message : ""}
        >
          {items.map((item) => (
            <MenuItem key={item.roleId} value={item.roleId}>
              {item.rolename}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

SelectFields.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  error: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};
