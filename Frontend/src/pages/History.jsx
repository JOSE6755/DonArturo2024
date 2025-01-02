import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/order";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
export default function History() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const res = await getOrdersByUser();
      if (res) {
        setOrders(res);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        minWidth="90%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {orders.length > 0 ? (
          <>
            <Typography variant="h4" alignSelf="start" letterSpacing={2}>
              Order History
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Date</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.OrderId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.CreationDate}
                      </TableCell>
                      <TableCell align="right">Q{order.Total}</TableCell>
                      <TableCell align="right">{order.State}</TableCell>
                      <TableCell align="right" width="20%">
                        <Button
                          variant="contained"
                          component={Link}
                          to={`/order/detail/${order.OrderId}`}
                          endIcon={<ReceiptLongIcon />}
                        >
                          Check Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            {" "}
            <Typography variant="h2">You dont have any order :(</Typography>
            <Button variant="contained" component={Link} to="/home">
              Make some orders :D
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
