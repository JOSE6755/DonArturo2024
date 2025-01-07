import {
  Box,
  Grid2,
  Paper,
  Rating,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCart from "../AddCart/AddCart";
import { useState } from "react";
import AddStock from "../AddStock/AddStock";
import ProductState from "../ProductState/ProductState";
import { Link } from "react-router-dom";

export default function ProductCard({ products = [], roleId = 1 }) {
  const [showModal, setshowModal] = useState(false);
  const [showProductState, setShowProductState] = useState(false);
  const [productSelected, setProductSelected] = useState({});

  function handleshowModal(product) {
    setProductSelected(product);
    setshowModal(!showModal);
  }
  function handleShowModalProductState(product) {
    setProductSelected(product);
    setShowProductState(!showProductState);
  }

  if (products.length === 0) {
    return (
      <Grid2 size={12} alignContent="center" height="100vh">
        <Typography variant="h2" align="center">
          We dont have any product with those requeriments :(
        </Typography>
      </Grid2>
    );
  }
  return (
    <>
      {products.map((product) => (
        <Grid2 size={{ xs: 10, sm: 8, md: 5, lg: 4 }} key={product.productId}>
          <Paper
            elevation={3}
            sx={{
              opacity: roleId === 1 ? (product.Stock <= 0 ? 0.7 : 1) : 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ width: "100%", maxHeight: "20rem", overflowY: "hidden" }}
            >
              <Box
                component="img"
                src={`http://localhost:3000/productImage/${product.Image}`}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Stack
                sx={{ width: "100%", flexWrap: "wrap" }}
                direction="row"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="subtitle1" alignSelf="center">
                  {product.Name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  alignSelf="center"
                  color={product.Stock <= 0 ? "error" : "success"}
                >
                  Stock: {product.Stock}
                </Typography>
                <Rating value={2} sx={{ width: "100%" }} readOnly />
                <Typography variant="body2" fontWeight="medium">
                  Price: {product.Price}
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  Brand: {product.Brand}
                </Typography>
              </Stack>
              {roleId === 1 ? (
                <Button
                  sx={{
                    padding: 1,
                    mt: 1,
                    "&:hover": { backgroundColor: "primary.light" },
                  }}
                  variant="contained"
                  size="small"
                  endIcon={<AddShoppingCartIcon />}
                  disabled={product.Stock <= 0}
                  onClick={() => {
                    handleshowModal(product);
                  }}
                >
                  Add to cart
                </Button>
              ) : (
                <>
                  <Button
                    sx={{
                      padding: 1,
                      mt: 1,
                      "&:hover": { backgroundColor: "primary.light" },
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleshowModal(product);
                    }}
                  >
                    Add to stock
                  </Button>
                  {product.StateId === 1 ? (
                    <Button
                      sx={{
                        padding: 1,
                        mt: 1,
                        "&:hover": { backgroundColor: "error.light" },
                      }}
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleShowModalProductState(product);
                      }}
                    >
                      Inactivate
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        padding: 1,
                        mt: 1,
                        "&:hover": { backgroundColor: "success.light" },
                      }}
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => {
                        handleShowModalProductState(product);
                      }}
                    >
                      Activate
                    </Button>
                  )}
                  <Button
                    sx={{
                      padding: 1,
                      mt: 1,
                      "&:hover": { backgroundColor: "primary.light" },
                    }}
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/editProduct/${product.productId}`}
                  >
                    Edit product
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid2>
      ))}
      {roleId === 1 ? (
        <AddCart
          show={showModal}
          handleShow={setshowModal}
          product={productSelected}
        />
      ) : (
        <>
          <AddStock
            show={showModal}
            handleShow={setshowModal}
            product={productSelected}
          />
          <ProductState
            show={showProductState}
            handleShow={setShowProductState}
            product={productSelected}
            activate={productSelected.StateId === 1 ? false : true}
          />
        </>
      )}
    </>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  roleId: PropTypes.number,
};
