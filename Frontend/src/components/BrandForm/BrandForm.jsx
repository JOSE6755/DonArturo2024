import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import TextFields from "../TextField/TextFields";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createBrand, updateBrand } from "../../services/brand";

export default function BrandForm({
  show = false,
  handleShow,
  brand,
  isEdit = false,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } });
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });

  useEffect(() => {
    if (isEdit) brand.name ? reset({ name: brand.name }) : "";
  }, [brand]);

  function closeModal() {
    setShowAlert({
      msg: "",
      variant: "error",
      show: false,
      type: "error",
    });
    reset({ name: "" });
    handleShow();
  }

  async function create(data) {
    try {
      const res = await createBrand(data.name);
      if (res) {
        setShowAlert({
          msg: "Brand created successfully",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
          closeModal();
        }, 3000);
      }
    } catch (error) {
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

  async function editBrand(data) {
    try {
      const res = await updateBrand(brand.brandId, data.name);
      if (res) {
        brand.name = data.name;
        setShowAlert({
          msg: "Brand updated successfully",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
          closeModal();
        }, 3000);
      }
    } catch (error) {
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

  async function onSubmit(data) {
    if (isEdit) {
      editBrand(data);
      return;
    }
    create(data);
  }
  return (
    <Modal
      open={show}
      onClose={() => {
        closeModal();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: { xs: "80%", sm: "70%", md: "60%", lg: "40%" },
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
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h6">
                {isEdit ? brand.name : "Create Brand"}
              </Typography>
              <TextFields
                control={control}
                error={errors}
                label="Name"
                name="name"
                slotProps={{}}
                type="text"
                fullWidth={true}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={showAlert.show}
                  sx={{ "&:hover": { backgroundColor: "success.light" } }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeModal}
                  sx={{ "&:hover": { backgroundColor: "secondary.light" } }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

BrandForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
};
