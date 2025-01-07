import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, getUserById, updateUser } from "../services/user";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Fade,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import SelectFields from "../components/Select/SelectFields";
import TextFields from "../components/TextField/TextFields";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { validators } from "../validators";
import dayjs from "dayjs";

const defaultValues = [
  {
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
  {
    names: "",
    lastNames: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthDate: null,
    roleId: 1,
  },
];
export default function OperatorCreateUser() {
  const params = useParams();
  const isEdit = !!params.id;
  const [alert, setAlert] = useState({
    show: false,
    severity: "error",
    msg: "",
    type: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEdit ? defaultValues[1] : defaultValues[0],
    resolver: yupResolver(
      isEdit
        ? validators.UPDATE_USER_VALIDATION_SCHEMA
        : validators.REGISTER_VALIDATION_SCHEMA
    ),
  });
  useEffect(() => {
    if (params.id) {
      getUser(params.id);
    }
  }, []);

  async function getUser(userId) {
    try {
      const res = await getUserById(userId);
      if (res) {
        reset({
          names: res.names,
          lastNames: res.lastNames,
          email: res.email,
          phoneNumber: res.phoneNumber,
          address: res.adress,
          birthDate: dayjs(res.birthDate),
          roleId: res.roleId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data) {
    data.birthDate = dayjs(data.birthDate).format("YYYY-MM-DD");
    try {
      if (isEdit) {
        const result = await updateUser(params.id, data);
        if (result) {
          setAlert({
            show: true,
            severity: "success",
            msg: "User Updated Succesfully!",
            type: "Success",
          });
          setTimeout(() => {
            setAlert({ ...alert, show: false });
          }, 5000);
        }
      } else {
        const result = await createUser(data);
        if (result) {
          setAlert({
            show: true,
            severity: "success",
            msg: "Everything went well, welcome!",
            type: "Success",
          });
          setTimeout(() => {
            setAlert({ ...alert, show: false });
          }, 5000);
        }
      }
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        msg: error.data.msg,
        type: "Error",
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000);
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
        <Fade in={alert.show} unmountOnExit={true}>
          <Alert severity={alert.severity}>
            <AlertTitle>{alert.type}</AlertTitle>
            {alert.msg}
          </Alert>
        </Fade>
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
            {!isEdit ? (
              <>
                {" "}
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
              </>
            ) : null}

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
                keyName="roleId"
                type="role"
                items={[
                  { roleId: 1, name: "User" },
                  { roleId: 2, name: "Operator" },
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
