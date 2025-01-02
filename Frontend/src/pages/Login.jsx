import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import LoginImage from "../assets/Tienda2.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { validators } from "../validators/index";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFields from "../components/TextField/TextFields";
import { login } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validators.LOGIN_VALIDATOR_SCHEMA),
  });
  const [visibility, setVisibility] = useState(false);
  const { setAuth } = useAuth();
  const [response, setResponse] = useState({
    status: null,
    msg: "",
    show: false,
  });
  const navigate = useNavigate();
  async function submitForm(data) {
    try {
      const response = await login(data);
      if (response) {
        setAuth(response);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setResponse({
        status: error.status,
        msg: error.data.msg,
        show: true,
      });
      setTimeout(() => {
        setResponse({ ...response, show: false });
      }, 5000);
      console.log(error);
    }
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={LoginImage}
            alt="miTienditaImage"
            sx={{ width: { xs: "80%", md: "50%" }, maxWidth: "20rem" }}
          />
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: 3,
              borderRadius: 2,
              border: 1,
              boxShadow: 2,
              borderColor: "primary.main",
            }}
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <Typography variant="h4" textAlign="center" gutterBottom>
                LOGIN
              </Typography>
              <Fade in={response.show} unmountOnExit={true}>
                <Alert severity="error">
                  <AlertTitle>Error {response.status}</AlertTitle>
                  {response.msg}
                </Alert>
              </Fade>
              <TextFields
                name="email"
                control={control}
                label="Email"
                fullWidth={true}
                type="email"
                error={errors}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextFields
                name="password"
                control={control}
                label="Password"
                type={visibility ? "text" : "password"}
                fullWidth={true}
                error={errors}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setVisibility(!visibility);
                          }}
                        >
                          {!visibility ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                  inputLabel: { shrink: true },
                }}
              />

              <Button
                variant="contained"
                sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
              <Link to="/userRegister">Dont have an account?</Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
