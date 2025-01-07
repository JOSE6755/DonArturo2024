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
import { useState } from "react";
import { updateCategoryState } from "../../services/categories";

export default function CategoryState({
  show = false,
  handleShow,
  category,
  activate = false,
}) {
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });

  function closeModal() {
    setShowAlert({
      msg: "",
      variant: "error",
      show: false,
      type: "error",
    });
    handleShow();
  }

  async function updateState() {
    try {
      const newState = category.stateId === 1 ? 2 : 1;
      const res = await updateCategoryState(category.categoryId, newState);
      if (res) {
        category.stateId = newState;
        console.log(res);
        setShowAlert({
          msg: "Category State updated successfully",
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
      console.log(error);
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
            >
              <Typography variant="h6">
                {activate
                  ? "Are you sure to activate this category?"
                  : "Are you sure to deactivate this product?"}
              </Typography>
              <Typography variant="caption" color="error">
                This will afect all products related to this category
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color={activate ? "success" : "error"}
                  disabled={showAlert.show}
                  onClick={updateState}
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
CategoryState.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  activate: PropTypes.bool,
};
