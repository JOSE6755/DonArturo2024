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

export default function ProductCard({ products = [] }) {
  const [showModalCart, setShowModalCart] = useState(false);
  const [productSelected, setProductSelected] = useState({});

  function handleShowModalCart(product) {
    setProductSelected(product);
    setShowModalCart(!showModalCart);
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
          <Paper elevation={3} sx={{ opacity: product.Stock <= 0 ? 0.7 : 1 }}>
            <Box
              component="img"
              src={`http://localhost:3000/productImage/${product.Image}`}
              sx={{ width: "100%", objectFit: "contain" }}
            />
            <Box sx={{ width: "100%", padding: 1 }}>
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
                  handleShowModalCart(product);
                }}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Paper>
        </Grid2>
      ))}
      <AddCart
        show={showModalCart}
        handleShow={setShowModalCart}
        product={productSelected}
      />
    </>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
