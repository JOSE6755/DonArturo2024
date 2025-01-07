import { Box, Button, Container, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import BrandForm from "../components/BrandForm/BrandForm";
import { getAllBrands } from "../services/brand";

export default function Brand() {
  const [brand, setBrand] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    brands();
  }, []);

  function handleShowModal(isEdit = false) {
    setShowModal(true);
    setIsEdit(isEdit);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedBrand({});
  }

  async function brands() {
    try {
      const res = await getAllBrands();
      if (res) {
        console.log(res);
        setBrand(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "90vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {brand.length > 0 ? (
          <>
            <Typography variant="h2" alignSelf="start">
              Brands
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleShowModal();
              }}
              sx={{ "&:hover": { backgroundColor: "primary.light" } }}
            >
              Create New Brand
            </Button>
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{ maxHeight: "40rem" }}
            >
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Brand Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brand.map((val) => (
                    <TableRow
                      key={val.brandId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {val.name}
                      </TableCell>
                      <TableCell sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          sx={{
                            width: "7rem",
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                          onClick={() => {
                            setSelectedBrand(val);
                            handleShowModal(true);
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
            <BrandForm
              show={showModal}
              handleShow={closeModal}
              brand={selectedBrand}
              isEdit={isEdit}
            />
          </>
        ) : (
          <Typography variant="h2">There are not brands :(</Typography>
        )}
      </Box>
    </Container>
  );
}
