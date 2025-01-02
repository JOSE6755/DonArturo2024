import {
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FilterForm } from "../components/FilterForm/FilterForm";
import { getAllActiveProducts } from "../services/products";
import ProductCard from "../components/ProductCard/ProductCard";

export default function ActiveProducts() {
  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts({});
  }, []);

  async function getProducts({
    price = "ASC",
    size = 5,
    page = 1,
    name = "%%",
    category = null,
  }) {
    try {
      console.log(price);
      const res = await getAllActiveProducts({
        price,
        size,
        page,
        name,
        category,
      });
      if (res) {
        setProducts(res.products);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function searchWithFilter(filters) {
    if (showModal) setShowModal(false);
    console.log(filters);
    getProducts({ ...filters });
  }

  function handleShowModal() {
    setShowModal(!showModal);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ minHeight: "100vh", mt: 5, display: "flex", gap: 3 }}
    >
      <Box
        sx={{
          width: "20%",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography variant="h4">Filters</Typography>
        <FilterForm
          border={1}
          width="100%"
          position="relative"
          ref={null}
          applyFilter={searchWithFilter}
        />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", lg: "block" } }}
      ></Divider>
      <Box sx={{ width: { xs: "100%", lg: "80%" } }}>
        <Grid2
          container
          spacing={3}
          sx={{
            justifyContent: { xs: "center", md: "center", lg: "start" },
            alignItems: { xs: "center", md: "center" },
            width: "100%",
          }}
        >
          <Grid2 sx={{ display: { lg: "none" } }} size={10}>
            <Stack sx={{ width: " 100%" }} direction="row" justifyContent="end">
              <Button
                variant="text"
                size="large"
                sx={{
                  width: "20%",
                  alignSelf: "end",
                  borderRadius: 0,
                  borderBottom: 1,
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Filter
              </Button>
            </Stack>
          </Grid2>
          <ProductCard
            products={products}
            handleShowModalCart={handleShowModal}
          />
        </Grid2>
      </Box>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          display: { xs: "flex", lg: "none" },
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Slide direction="up" in={showModal} mountOnEnter unmountOnExit>
          <FilterForm
            border={1}
            width="80%"
            position="absolute"
            ref={null}
            applyFilter={searchWithFilter}
          />
        </Slide>
      </Modal>
    </Container>
  );
}