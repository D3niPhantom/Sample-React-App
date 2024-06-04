import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerList = ({
  customers,
  deleteCustomer,
  editCustomer,
  startEditingCustomer,
  editingCustomer,
}) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (customer) => {
    const updatedCustomerData = {
      ...updatedCustomer,
      firstName: updatedCustomer.firstName || customer.firstName,
      lastName: updatedCustomer.lastName || customer.lastName,
      email: updatedCustomer.email || customer.email,
    };
    editCustomer(customer.id, updatedCustomerData);
    setUpdatedCustomer({ firstName: "", lastName: "", email: "" });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              {editingCustomer && editingCustomer.id === customer.id ? (
                <>
                  <TableCell>
                    <TextField
                      type="text"
                      name="firstName"
                      value={updatedCustomer.firstName || customer.firstName}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      name="lastName"
                      value={updatedCustomer.lastName || customer.lastName}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="email"
                      name="email"
                      value={updatedCustomer.email || customer.email}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditSubmit(customer)}
                    >
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => startEditingCustomer(customer.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CustomerList;
