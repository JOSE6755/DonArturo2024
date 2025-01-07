import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Fade,
  Grid2,
  Input,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextFields from "../TextField/TextFields";
import { Controller, useForm } from "react-hook-form";
import SelectFields from "../Select/SelectFields";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categories";
import { getAllBrands } from "../../services/brand";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_PRODUCT_SCHEMA } from "../../validators/product";
import {
  createProduct,
  editProduct,
  getSingleProduct,
} from "../../services/products";
import { useParams } from "react-router-dom";

export default function ProductForm() {
  const params = useParams();
  const isEdit = !!params.id;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      image: null,
      name: "",
      code: "",
      stock: 1,
      price: 0,
      brandId: 0,
      categories: [],
    },
    resolver: yupResolver(CREATE_PRODUCT_SCHEMA),
    context: { isEdit },
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });

  useEffect(() => {
    if (params.id) {
      getProduct();
    }
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setValue("image", file);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function getCategories() {
    try {
      const res = await getAllCategories();
      setCategories(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBrands() {
    try {
      const res = await getAllBrands();
      if (res) {
        setBrands(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getProduct() {
    if (params.id) {
      try {
        const res = await getSingleProduct(params.id);
        if (res) {
          console.log(res);
          const categoriesString = res.Categories.split(",");
          const categories = categoriesString.map(Number);
          console.log(categories);
          setImagePreview(`http://localhost:3000/productImage/${res.Image}`);
          reset({
            image: res.Image,
            name: res.Name,
            code: res.Code,
            stock: res.Stock,
            price: res.Price,
            brandId: res.BrandId,
            categories: categories,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function newProduct(data) {
    const image = data.image;
    const productData = {
      name: data.name,
      code: data.code,
      stock: data.stock,
      price: data.price,
      brandId: data.brandId,
      categories: data.categories,
    };
    try {
      const res = await createProduct(image, productData);
      if (res) {
        setShowAlert({
          msg: "Product created successfully",
          show: true,
          type: "Success",
          variant: "success",
        });
        reset();
        setImagePreview("");
        setTimeout(() => {
          setShowAlert({
            msg: "",
            variant: "error",
            show: false,
            type: "error",
          });
        }, 5000);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProduct(data) {
    let image = data.image;
    const productData = {
      name: data.name,
      code: data.code,
      stock: data.stock,
      price: data.price,
      brandId: data.brandId,
      categories: data.categories,
    };

    try {
      if (typeof image === "string") image = null;
      const res = await editProduct(params.id, productData, image);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data) {
    if (isEdit) {
      updateProduct(data);
      return;
    }
    newProduct(data);
  }

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);
  return (
    <Container maxWidth="xl" sx={{ minHeight: "90vh", p: 1 }}>
      <Stack justifyContent="center" alignItems="center" mt={2} gap={3} p={2}>
        <Fade in={showAlert.show} unmountOnExit={true}>
          <Alert severity={showAlert.variant}>
            <AlertTitle>{showAlert.type}</AlertTitle>
            {showAlert.msg}
          </Alert>
        </Fade>
        <Typography variant="h2">Product Form</Typography>
        <Box
          sx={{
            boxShadow: 3,
            p: 1,
            maxWidth: { xs: "70%", sm: "50%", md: "40%", lg: "25%" },
            display: imagePreview ? "flex" : "none",
          }}
        >
          <Box
            component="img"
            sx={{
              objectFit: "cover",
              width: "100%",
              maxHeight: "15rem",
            }}
            src={imagePreview ? imagePreview : ""}
            alt="image preview"
          />
        </Box>

        <Box
          sx={{
            width: "70%",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            padding: 2,
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid2 container spacing={4} sx={{ padding: 2 }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="name"
                control={control}
                label="Name"
                type="text"
                fullWidth={true}
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="code"
                control={control}
                label="Code"
                type="text"
                fullWidth={true}
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="stock"
                control={control}
                label="Stock"
                type="text"
                fullWidth={true}
                error={errors}
                slotProps={{}}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFields
                name="price"
                control={control}
                label="Price"
                type="text"
                fullWidth={true}
                error={errors}
                slotProps={{}}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <SelectFields
                name="brandId"
                control={control}
                label="Brand"
                fullWidth={true}
                error={errors}
                keyName="brandId"
                type="brand"
                items={brands}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ maxHeight: "20rem" }}
                    label="Categories"
                    fullWidth={true}
                    variant="standard"
                    select
                    slotProps={{
                      select: {
                        multiple: true,
                      },
                    }}
                    defaultValue={0}
                    error={errors["categories"] ? true : false}
                    helperText={
                      errors["categories"] ? errors["categories"].message : ""
                    }
                  >
                    <MenuItem value={0}>none</MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category["categoryId"]}
                        value={category["categoryId"]}
                      >
                        {category["name"]}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                component="label"
                endIcon={<AddAPhotoIcon />}
                color={errors["image"] ? "error" : "primary"}
                sx={{ "&:hover": { backgroundColor: "primary.light" } }}
              >
                Upload Image
                <Input
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Button>
              {errors["image"] ? (
                <Typography variant="caption" color="error">
                  {errors["image"].message}
                </Typography>
              ) : null}
            </Grid2>
          </Grid2>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ "&:hover": { backgroundColor: "success.light" } }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
