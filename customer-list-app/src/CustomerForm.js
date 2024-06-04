import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const CustomerForm = ({ addCustomer }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => {
    // The regex used by [type="email"]
    var regex =
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  };

  const handleAddCustomer = () => {
    let hasError = false;

    if (!firstName || !lastName || !email) {
      setFormError("Please fill in all fields.");
      hasError = true;
    } else {
      setFormError("");
    }

    if (!email || !isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!hasError && firstName.trim() && lastName.trim() && email.trim()) {
      addCustomer(firstName, lastName, email);
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {formError && <Alert severity="error">{formError}</Alert>}{" "}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Typography variant="body1" width={100}>
          First Name:
        </Typography>
        <TextField
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputProps={{
            style: { paddingLeft: 10 },
          }}
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Typography variant="body1" width={100}>
          Last Name:
        </Typography>
        <TextField
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputProps={{
            style: { paddingLeft: 10 },
          }}
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Typography variant="body1" width={100}>
          Email:
        </Typography>
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
      </Stack>
      <Button variant="contained" color="primary" onClick={handleAddCustomer}>
        Add Customer
      </Button>
    </Box>
  );
};

export default CustomerForm;
