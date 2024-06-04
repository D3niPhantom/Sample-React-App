import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import {
  Container,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import IconToggle from "./util/IconToggle";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "./styles/DarkMode.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const addCustomer = (firstName, lastName, email) => {
    setCustomers([
      ...customers,
      { id: Date.now(), firstName, lastName, email },
    ]);
    toast.success("Customer added successfully");
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    toast.success("Customer deleted successfully");
  };

  const editCustomer = (id, updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );
    toast.success("Customer updated successfully");
    setEditingCustomer(null);
  };

  const startEditingCustomer = (id) => {
    const customerToEdit = customers.find((customer) => customer.id === id);
    setEditingCustomer(customerToEdit);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5", // Change the primary color
      },
      secondary: {
        main: "#f50057", // Change the secondary color
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif", // Change the font family
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: darkMode
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: darkMode ? "white" : "inherit",
              }}
            >
              Customer Management System
            </Typography>
            <div>
              <IconToggle
                checked={darkMode}
                onChange={toggleDarkMode}
                color="primary"
                aria-label="Toggle dark mode"
              />
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Add a new customer" />
                  <CardContent>
                    <CustomerForm addCustomer={addCustomer} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Customer List" />
                  <CardContent>
                    <CustomerList
                      customers={customers}
                      deleteCustomer={deleteCustomer}
                      editCustomer={editCustomer}
                      startEditingCustomer={startEditingCustomer}
                      editingCustomer={editingCustomer}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
