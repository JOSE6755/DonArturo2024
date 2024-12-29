import {
  Grid2,
  Container,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextFields from "../components/TextField/TextFields";
import { Controller, useForm } from "react-hook-form";
import SelectFields from "../components/Select/SelectFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { validators } from "../validators";
import dayjs from "dayjs";
import { createUser } from "../services/user";

export default function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      names: "",
      lastNames: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      birthDate: null,
      roleId: 1,
    },
    resolver: yupResolver(validators.REGISTER_VALIDATION_SCHEMA),
  });

  async function onSubmit(data) {
    data.birthDate = dayjs(data.birthDate).format("YYYY-MM-DD");
    try {
      const result = await createUser(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ boxShadow: 3 }}
        gap={3}
        padding={2}
        borderRadius={2}
        width="80%"
        border={1}
        borderColor="primary.main"
      >
        <Typography variant="h2" textAlign="center" gutterBottom>
          Register Form
        </Typography>
        <Box
          sx={{
            width: "100%",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid2 container spacing={5} sx={{ padding: 2 }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="names"
                control={control}
                label="Names"
                fullWidth={true}
                type="text"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="lastNames"
                control={control}
                label="Last Names"
                fullWidth={true}
                type="text"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="email"
                control={control}
                label="Email"
                fullWidth={true}
                type="email"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="phoneNumber"
                control={control}
                label="Phone Number"
                fullWidth={true}
                type="text"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="password"
                control={control}
                label="Password"
                fullWidth={true}
                type="password"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                fullWidth={true}
                type="password"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DesktopDatePicker
                      {...field}
                      label="Birth Date"
                      format="YYYY-MM-DD"
                      slotProps={{
                        textField: {
                          variant: "standard",
                          fullWidth: true,
                          error: errors["birthDate"] ? true : false,
                          helperText: errors["birthDate"]
                            ? errors["birthDate"].message
                            : "",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="address"
                control={control}
                label="Address"
                fullWidth={true}
                type="text"
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <SelectFields
                name="roleId"
                control={control}
                label="Role"
                fullWidth={true}
                error={errors}
                items={[
                  { roleId: 1, rolename: "User" },
                  { roleId: 2, rolename: "Operator" },
                ]}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <Button
                variant="contained"
                sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                fullWidth
                type="submit"
              >
                Enviar
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Stack>
    </Container>
  );
}
