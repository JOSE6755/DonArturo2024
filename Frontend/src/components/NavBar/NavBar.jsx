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
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CreateIcon from "@mui/icons-material/Create";
import ListIcon from "@mui/icons-material/List";
import CategoryIcon from "@mui/icons-material/Category";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleIcon from "@mui/icons-material/People";
export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  function logOut() {
    if (auth) {
      setAuth({});
      localStorage.removeItem("user");
      navigate("/login");
    }
  }
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
            {auth.roleId === 1 ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  sx={{
                    color: "white",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/productForm"
                  endIcon={<CreateIcon />}
                >
                  Create Product
                </Button>
                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/adminProduct"
                  endIcon={<ListIcon />}
                >
                  Product List
                </Button>
                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/brands"
                >
                  Brand
                </Button>
                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/categories"
                  endIcon={<CategoryIcon />}
                >
                  Categories
                </Button>
                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/orders"
                  endIcon={<NewspaperIcon />}
                >
                  Orders
                </Button>
                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    my: 2,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  component={Link}
                  to="/users"
                  endIcon={<PeopleIcon />}
                >
                  Users
                </Button>
              </>
            )}

            <Button
              sx={{
                color: "white",
                textAlign: "center",
                my: 2,
                "&:hover": { backgroundColor: "primary.light" },
              }}
              onClick={() => {
                logOut();
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
