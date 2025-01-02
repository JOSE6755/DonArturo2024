import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Fade,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import {
  confirmOrder,
  emptyShopCart,
  getShopCart,
  removeProductFromShopCart,
} from "../services/shopCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ShopCart() {
  const { auth } = useAuth();
  const [products, setProducts] = useState({ products: [], total: 0 });
  const [orderMade, setOrderMade] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "error",
    msg: "",
    variant: "error",
  });

  useEffect(() => {
    getUserShopCart();
  }, []);

  async function getUserShopCart() {
    try {
      const res = await getShopCart(auth.shopCartId);
      console.log(res);
      if (res) setProducts(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProduct(product) {
    try {
      const res = await removeProductFromShopCart(
        auth.shopCartId,
        product.ProductId
      );
      const newListProducts = products.products.filter(
        (p) => p.ProductId !== product.ProductId
      );
      if (res) {
        setProducts({
          products: newListProducts,
          total: products.total - product.Quantity * product.Price,
        });
        setShowAlert({
          msg: "Product removed successfully",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
        }, 5000);
      }
    } catch (error) {
      setShowAlert({
        msg: error.message,
        variant: "error",
        show: true,
        type: "Error",
      });
      setTimeout(() => {
        setShowAlert({ ...showAlert, show: false });
      }, 5000);
    }
  }
  async function emptyCart() {
    try {
      const res = await emptyShopCart(auth.shopCartId);
      if (res) {
        setProducts({ products: [], total: 0 });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function makeOrder() {
    try {
      const res = await confirmOrder(products.total);
      if (res) {
        setOrderMade(true);
        setShowAlert({
          show: true,
          msg: "Thank you for your order :)",
          type: "Success",
          variant: "success",
        });
        setTimeout(() => {
          setProducts({ products: [], total: 0 });
          setShowAlert({
            show: false,
            type: "error",
            msg: "",
            variant: "error",
          });
          console.log(res);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          width: "80%",
        }}
      >
        {products.products.length > 0 ? (
          <>
            <Fade in={showAlert.show} unmountOnExit={true}>
              <Alert severity={showAlert.variant}>
                <AlertTitle>{showAlert.type}</AlertTitle>
                {showAlert.msg}
              </Alert>
            </Fade>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h6">Total: {products.total}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  disabled={orderMade}
                  endIcon={<ShoppingCartCheckoutIcon />}
                  onClick={() => {
                    makeOrder();
                  }}
                >
                  Order
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  disabled={orderMade}
                  endIcon={<DeleteForeverIcon />}
                  onClick={() => {
                    emptyCart();
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Stack>
            <TableContainer sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>SubTotal</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.products.map((product) => (
                    <TableRow
                      key={product.ProductId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {product.Name}
                      </TableCell>
                      <TableCell align="right">{product.Quantity}</TableCell>
                      <TableCell align="right">{product.Price}</TableCell>
                      <TableCell align="right">{product.SubTotal}</TableCell>
                      <TableCell align="right" sx={{ width: "15%" }}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="error"
                          endIcon={<RemoveShoppingCartIcon />}
                          disabled={orderMade}
                          onClick={() => {
                            removeProduct(product);
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography variant="h2">Your Shop Cart is empty :(</Typography>
            <Button
              component={Link}
              to="/home"
              variant="contained"
              endIcon={<SearchIcon />}
            >
              Find Some Products
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
