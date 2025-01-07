import { useRef, useState } from "react";
import { updateProductState } from "../../services/products";
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

export default function ProductState({
  show = false,
  handleShow,
  product,
  activate = false,
}) {
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });
  const timeOutRef = useRef(null);
  function closeModal() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
    setShowAlert({
      msg: "",
      variant: "error",
      show: false,
      type: "error",
    });
    handleShow(false);
  }
  async function productState() {
    try {
      const data = {
        stateId: product.StateId === 1 ? 2 : 1,
      };
      const res = await updateProductState(product.productId, data);
      if (res) {
        product.StateId = data.stateId;
        setShowAlert({
          msg: "Product State updated successfully",
          variant: "success",
          show: true,
          type: "Success",
        });
        timeOutRef.current = setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
          closeModal();
        }, 5000);
      }
    } catch (error) {
      setShowAlert({
        msg: error.data.msg ? error.data.msg : "Error updating product state",
        variant: "error",
        show: true,
        type: "Error",
      });
      timeOutRef.current = setTimeout(() => {
        setShowAlert({ ...showAlert, show: false });
        closeModal();
      }, 6000);
    }
  }
  return (
    <Modal
      open={show}
      onClose={() => {
        closeModal();
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

            <Box sx={{ width: "100%" }}>
              <Stack justifyContent="center" alignItems="center" gap={1}>
                <Typography variant="h6">
                  {activate
                    ? "Are you sure to activate this product?"
                    : "Are you sure to deactivate this product?"}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    color={activate ? "success" : "error"}
                    disabled={showAlert.show}
                    onClick={() => {
                      productState();
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: activate
                          ? "success.light"
                          : "error.light",
                      },
                    }}
                  >
                    {activate ? "Activate" : "Deactivate"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      closeModal();
                    }}
                    sx={{ "&:hover": { backgroundColor: "secondary.light" } }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}
ProductState.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  activate: PropTypes.bool,
};
