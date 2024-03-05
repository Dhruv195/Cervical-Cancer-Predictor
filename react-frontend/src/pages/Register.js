import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import Title from "../components/Title";
import { useNavigate, NavLink } from "react-router-dom";
import { tabTitle } from "../App";
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen";

const Register = ({ setUserState }) => {
  tabTitle("Registration | Cervical Cancer Awareness ");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object().shape({
      FirstName: yup.string().required("First Name is required"),
      LastName: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
      cpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      let user = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Email: values.email,
        Password: values.cpassword,
      };

      console.log("user", user);
      setLoading(true);

      axios.post("http://127.0.0.1:5000/register", user).then((response) => {
        // Handle successful response here, if needed
        console.log("API response:", response); // Console log
        toast.success("Register successful!");

        navigate("/otpverification", {
          state: {
            email: formik.values.email,
          },
        });
      });
    },
  });

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <ToastContainer position="top-center" />

      <Title text={"Registration"} textAlign={"center"} />

      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          mt: 1,
          py: 2,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="FirstName"
          name="FirstName"
          placeholder="First Name"
          label="First Name"
          value={formik.values.FirstName}
          onChange={formik.handleChange}
          error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
          helperText={formik.touched.FirstName && formik.errors.FirstName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="LastName"
          name="LastName"
          placeholder="Last Name"
          label="Last Name"
          value={formik.values.LastName}
          onChange={formik.handleChange}
          error={formik.touched.LastName && Boolean(formik.errors.LastName)}
          helperText={formik.touched.LastName && formik.errors.LastName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          placeholder="Email Address"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="cpassword"
          name="cpassword"
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          value={formik.values.cpassword}
          onChange={formik.handleChange}
          error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
          helperText={formik.touched.cpassword && formik.errors.cpassword}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="medium"
          sx={{
            fontSize: "0.9rem",
            textTransform: "capitalize",
            py: 2,
            mt: 3,
            mb: 2,
            borderRadius: 0,
            backgroundColor: "#14192d",
            "&:hover": {
              backgroundColor: "#1e2a5a",
            },
          }}
        >
          Register
        </Button>
        <NavLink to="/login">Already registered? Login</NavLink>
      </Box>
      {loading && <LoadingScreen />}
    </Stack>
  );
};

export default Register;
