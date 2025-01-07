import { Box, Button, Container, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categories";
import CategoryState from "../components/CategoryState/CategoryState";
import CategoryForm from "../components/CategoryForm/CategoryForm";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [showCategoryState, setShowCategoryState] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [isEditCateogry, setIsEditCateogry] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  useEffect(() => {
    getCategories();
  }, []);
  function handleShowStateModal(category) {
    setShowCategoryState(true);
    setSelectedCategory(category);
  }
  function handleCloseStateModal() {
    setShowCategoryState(false);
    setSelectedCategory({});
  }
  function handleShowCategoryForm(category) {
    setShowCategoryForm(true);
    setSelectedCategory(category);
  }
  function handleCloseCategoryForm() {
    setShowCategoryForm(false);
    setSelectedCategory({});
    setIsEditCateogry(false);
  }
  async function getCategories() {
    try {
      const res = await getAllCategories();
      if (res) {
        setCategories(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "50%",
        }}
      >
        {categories.length > 0 ? (
          <>
            <Button
              variant="contained"
              onClick={() => {
                handleShowCategoryForm({});
              }}
              sx={{ "&:hover": { backgroundColor: "primary.light" } }}
            >
              Create New Category
            </Button>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ maxHeight: "40rem" }}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category Name</TableCell>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow
                      key={category.categoryId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {category.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color={category.stateId === 1 ? "error" : "success"}
                          sx={{
                            width: "50%",
                            "&:hover": {
                              backgroundColor:
                                category.stateId === 1
                                  ? "error.light"
                                  : "success.light",
                            },
                          }}
                          onClick={() => {
                            handleShowStateModal(category);
                          }}
                        >
                          {category.stateId === 1 ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "50%",
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                          onClick={() => {
                            setIsEditCateogry(true);
                            handleShowCategoryForm(category);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CategoryState
              category={selectedCategory}
              show={showCategoryState}
              handleShow={handleCloseStateModal}
              activate={selectedCategory.stateId === 1 ? false : true}
            />
            <CategoryForm
              category={selectedCategory}
              handleShow={handleCloseCategoryForm}
              isEdit={isEditCateogry}
              show={showCategoryForm}
            />
          </>
        ) : (
          <>
            <Typography variant="h2">There are not categories :(</Typography>
            <Button variant="contained">Create New Category</Button>
          </>
        )}
      </Box>
    </Container>
  );
}
