import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Fade,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { changeOrderState, getAllOrders } from "../services/order";
import { Link } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState({
    msg: "",
    variant: "error",
    show: false,
    type: "error",
  });

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const res = await getAllOrders();
      if (res) {
        setOrders(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptOrder(order) {
    try {
      const res = await changeOrderState(order.orderId, 4);
      if (res) {
        const newOrders = orders.filter((val) => val.orderId !== order.orderId);
        console.log(newOrders);
        setOrders(newOrders);
        setShowAlert({
          msg: "Order delivered successfully",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function rejectOrder(order) {
    try {
      const res = await changeOrderState(order.orderId, 5);
      if (res) {
        const newOrders = orders.filter((val) => val.orderId !== order.orderId);
        console.log(newOrders);
        setOrders(newOrders);
        console.log(res);
        setShowAlert({
          msg: "Order rejected",
          variant: "success",
          show: true,
          type: "Success",
        });
        setTimeout(() => {
          setShowAlert({ ...showAlert, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "70%",
        }}
      >
        {orders.length > 0 ? (
          <>
            <Fade in={showAlert.show} unmountOnExit={true}>
              <Alert severity={showAlert.variant}>
                <AlertTitle>{showAlert.type}</AlertTitle>
                {showAlert.msg}
              </Alert>
            </Fade>
            <Typography variant="h3" alignSelf="start" letterSpacing={2}>
              Orders
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.orderId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.creationDate}
                      </TableCell>
                      <TableCell>Q{order.total}</TableCell>
                      <TableCell>{order.state.name}</TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            acceptOrder(order);
                          }}
                          sx={{
                            "&:hover": { backgroundColor: "success.light" },
                          }}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            rejectOrder(order);
                          }}
                          sx={{ "&:hover": { backgroundColor: "error.light" } }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          component={Link}
                          to={`/order/detail/${order.orderId}`}
                          sx={{
                            "&:hover": { backgroundColor: "primary.light" },
                          }}
                        >
                          Order Detail
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
            <Typography variant="h2">
              There are not orders! You are up to date :)
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}
