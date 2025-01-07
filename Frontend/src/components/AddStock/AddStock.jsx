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
import { editProduct } from "../../services/products";

export default function AddStock({ show = false, handleShow, product }) {
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
    if (quantity > 0) {
      setProductQuantity(quantity);
    }
  }

  async function addStock(quantity) {
    const data = {
      name: product.Name,
      code: product.Code,
      stock: product.Stock + quantity,
      price: product.Price,
      stateId: product.StateId,
      brandId: product.BrandId,
      categories: product.Categories.split(","),
    };
    try {
      const res = await editProduct(product.productId, data, null);
      if (res) {
        product.Stock = product.Stock + quantity;
        setShowAlert({
          msg: "Product Stock updated successfully",
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
      console.error(error);
      setShowAlert({
        msg: error.data.msg,
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
                  >
                    +
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  color="success"
                  disabled={
                    productQuantity < 1 ? true : showAlert.show ? true : false
                  }
                  onClick={() => {
                    addStock(productQuantity);
                  }}
                >
                  Add Stock
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

AddStock.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
