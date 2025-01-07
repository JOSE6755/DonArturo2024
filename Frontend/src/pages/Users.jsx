import { Box, Button, Container, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getUsers } from "../services/user";
import UserState from "../components/UserState/UserState";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState({});
  const [showStateModal, setShowStateModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleShowStateModal(user) {
    setUserSelected(user);
    setShowStateModal(true);
  }

  function handleCloseStateModal() {
    setUserSelected({});
    setShowStateModal(false);
  }

  async function getAllUsers() {
    try {
      const res = await getUsers();
      if (res) {
        setUsers(res);
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
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",

          width: "100%",
          gap: 2,
          py: 2,
        }}
      >
        {users.length > 0 ? (
          <>
            <Typography variant="h2">Users</Typography>
            <Button
              variant="contained"
              component={Link}
              to="/operatorCreateUser"
              sx={{
                alignSelf: "center",
                "&:hover": { backgroundColor: "primary.light" },
              }}
            >
              Create New User
            </Button>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "40rem", width: "100%" }}
            >
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Names</TableCell>
                    <TableCell>Last Names</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.userId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.names}
                      </TableCell>
                      <TableCell>{user.lastNames}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.adress}</TableCell>
                      <TableCell>{user.role.name}</TableCell>
                      <TableCell
                        sx={{ color: user.client ? "" : "error.main" }}
                      >
                        {user.client
                          ? user.client.commercialName
                          : "It does not belongs to a client"}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Button
                            variant="contained"
                            color={user.stateId === 2 ? "success" : "error"}
                            sx={{
                              width: "60%",
                              "&:hover": {
                                backgroundColor:
                                  user.stateId === 2
                                    ? "success.light"
                                    : "error.light",
                              },
                            }}
                            onClick={() => {
                              handleShowStateModal(user);
                            }}
                          >
                            {user.stateId === 2 ? "Activate" : "Deactivate"}
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: "40%",
                              "&:hover": { backgroundColor: "primary.light" },
                            }}
                            component={Link}
                            to={`/operatorCreateUser/${user.userId}`}
                          >
                            Edit
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography>There are not users :(</Typography>
          </>
        )}
      </Box>
      <UserState
        user={userSelected}
        handleShow={handleCloseStateModal}
        activate={userSelected.stateId === 2 ? true : false}
        show={showStateModal}
      />
    </Container>
  );
}
