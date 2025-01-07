import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { insertCart } from "../../services/shopCart";
import useAuth from "../../hooks/useAuth";

export default function AddCart({ show = false, handleShow, product }) {
  const { auth } = useAuth();
  const [productQuantity, setProductQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });
  function closeModal() {
    setProductQuantity(1);
    setShowAlert({
      msg: "",
      variant: "error",
      show: false,
      type: "error",
    });
    handleShow(false);
  }

  function handleProductQuantity(quantity) {
    if (quantity <= product.Stock) {
      setProductQuantity(quantity);
    }
  }

  async function addCart(quantity) {
    const data = {
      quantity: quantity,
      price: product.Price,
      subTotal: quantity * product.Price,
      productId: product.productId,
      shopCartId: auth.shopCartId,
    };
    try {
      const res = await insertCart({ ...data });
      if (res) {
        setShowAlert({
          msg: "Product added to your cart!",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
          closeModal();
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
        closeModal();
      }, 5000);
    }
  }
  return (
    <Modal
      open={show}
      onClose={() => {
        closeModal(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        display: { xs: "flex" },
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: { xs: "80%", sm: "70%", md: "60%", lg: "30%" },
            backgroundColor: "white",
            position: "absolute",
            boxShadow: 5,
            borderRadius: 2,
          }}
        >
          <Stack justifyContent="center" alignItems="center" gap={1} p={2}>
            <Fade in={showAlert.show} unmountOnExit={true}>
              <Alert severity={showAlert.variant}>
                <AlertTitle>{showAlert.type}</AlertTitle>
                {showAlert.msg}
              </Alert>
            </Fade>
            <Box
              sx={{ width: "100%", my: 1, borderRadius: 1 }}
              component="img"
              src={`http://localhost:3000/productImage/${product.Image}`}
            ></Box>
            <Box sx={{ width: "100%" }}>
              <Stack justifyContent="center" alignItems="center" gap={1}>
                <Typography variant="h6">Price: {product.Price}</Typography>
                <Typography variant="subtitle1">Quantity</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleProductQuantity(productQuantity - 1);
                    }}
                    disabled={productQuantity === 1}
                    sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                  >
                    -
                  </Button>
                  <Paper
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {productQuantity}
                  </Paper>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleProductQuantity(productQuantity + 1);
                    }}
                    disabled={productQuantity === product.Stock}
                    sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                  >
                    +
                  </Button>
                </Box>
                <Typography variant="h6">
                  Total: {product.Price * productQuantity}
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  disabled={
                    productQuantity < 1 ? true : showAlert.show ? true : false
                  }
                  onClick={() => {
                    addCart(productQuantity);
                  }}
                  sx={{ "&:hover": { backgroundColor: "success.light" } }}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

AddCart.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
