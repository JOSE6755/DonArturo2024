import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import SelectFields from "../Select/SelectFields";
import SearchIcon from "@mui/icons-material/Search";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextFields from "../TextField/TextFields";
import { getAllCategories } from "../../services/categories";

export const FilterForm = forwardRef(
  (
    {
      width,
      position,
      border = null,
      borderColor = "primary.main",
      applyFilter,
      roleId = 1,
    },
    ref
  ) => {
    const [categories, setCategories] = useState([]);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        name: "",
        price: "ASC",
        size: 5,
        category: 0,
        state: 1,
      },
    });
    useEffect(() => {
      getCategories();
    }, []);
    async function getCategories() {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    }

    function onSubmit(data) {
      if (data.category === 0) {
        data.category = null;
        data.name = `%${data.name}%`;
        data.size = Number(data.size);
        applyFilter(data);
        return;
      }
      data.name = `%${data.name}%`;
      data.size = Number(data.size);
      applyFilter(data);
    }
    return (
      <Box
        sx={{
          width: width,
          backgroundColor: "white",
          padding: 2,
          position: position,
          border: border ? `${border}px solid` : "none",
          borderColor: borderColor,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={ref}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          gap={2}
          sx={{ width: "100%" }}
          divider={<Divider variant="middle" />}
        >
          <TextFields
            name="name"
            control={control}
            label="Product Name"
            type="text"
            fullWidth={true}
            error={errors}
            autoFocus={true}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl>
            <FormLabel htmlFor="formGroup">Price Order</FormLabel>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <RadioGroup id="formGroup" value="DESC" row {...field}>
                  <FormControlLabel
                    value="ASC"
                    control={<Radio />}
                    label="Ascendent"
                  />
                  <FormControlLabel
                    value="DESC"
                    control={<Radio />}
                    label="Descendent"
                  />
                </RadioGroup>
              )}
            ></Controller>
          </FormControl>
          {roleId === 2 ? (
            <FormControl>
              <FormLabel htmlFor="formGroup">State</FormLabel>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <RadioGroup id="formGroup" value={3} row {...field}>
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Inactive"
                    />
                  </RadioGroup>
                )}
              ></Controller>
            </FormControl>
          ) : null}
          <FormControl>
            <FormLabel htmlFor="productsPerPage">Products per page</FormLabel>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <RadioGroup id="productsPerPage" value={5} row {...field}>
                  <FormControlLabel value={5} control={<Radio />} label="5" />
                  <FormControlLabel value={10} control={<Radio />} label="10" />
                </RadioGroup>
              )}
            />
          </FormControl>
          <SelectFields
            name="category"
            label="category"
            control={control}
            fullWidth={true}
            error={errors}
            items={categories.length > 0 ? categories : []}
            keyName="categoryId"
            type="categories"
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "50%", "&:hover": { backgroundColor: "primary.light" } }}
        >
          Search
        </Button>
      </Box>
    );
  }
);
FilterForm.propTypes = {
  width: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  border: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderColor: PropTypes.string,
  applyFilter: PropTypes.func.isRequired,
  roleId: PropTypes.number,
};
FilterForm.displayName = "FilterForm";
