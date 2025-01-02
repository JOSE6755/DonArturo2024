import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            noWrap
            component={Link}
            to="/home"
            sx={{
              display: "flex",
              fontWeight: 700,
              textDecoration: "none",
              color: "white",
              mr: 1,
            }}
          >
            MITIENDITA
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              gap: 1,
            }}
          >
            <Button
              sx={{
                color: "white",
                my: 2,
                "&:hover": { backgroundColor: "primary.light" },
              }}
              component={Link}
              to="/orderHistory"
              endIcon={<HistoryEduIcon />}
            >
              History
            </Button>
            <Button
              sx={{
                color: "white",
                textAlign: "center",
                my: 2,
                "&:hover": { backgroundColor: "primary.light" },
              }}
              component={Link}
              to="/shopCart"
              endIcon={<ShoppingCartIcon />}
            >
              Shop Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
