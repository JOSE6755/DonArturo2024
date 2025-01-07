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
  keyName,
  type = "categories",
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{ maxHeight: "20rem" }}
          label={label}
          fullWidth={fullWidth}
          variant="standard"
          select
          defaultValue={0}
          error={error[name] ? true : false}
          helperText={error[name] ? error[name].message : ""}
        >
          <MenuItem value={0}>
            {type === "categories" ? "all" : "none"}
          </MenuItem>
          {items.map((item) => (
            <MenuItem key={item[keyName]} value={item[keyName]}>
              {item.name}
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
  keyName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
