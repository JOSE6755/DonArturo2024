import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../services/order";
import { useEffect, useState } from "react";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function HistoryDetail() {
  const [historyData, setHistoryData] = useState({ products: [], total: 0 });
  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    try {
      const res = await getOrderDetail(params.id);
      if (res) {
        console.log(res);
        const total = res.reduce((ac, cv) => ac + cv.SubTotal, 0);
        setHistoryData({ products: res, total: total });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      {historyData.products.length > 0 ? (
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h3" letterSpacing={2} alignSelf="start">
            Order Detail
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.products.map((record) => (
                  <TableRow
                    key={record.ProductId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{record.Name}</TableCell>
                    <TableCell>{record.Price}</TableCell>
                    <TableCell>{record.Quantity}</TableCell>
                    <TableCell>{record.SubTotal}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    Total: {historyData.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <Typography variant="h2">
            For some reason this order is empty
          </Typography>
        </>
      )}
    </Container>
  );
}
