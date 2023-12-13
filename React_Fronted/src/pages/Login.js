import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import Title from "../components/Title";
import { useNavigate, NavLink } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ setUserState }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = {
        Email: values.email,
        Password: values.password,
      };
      console.log("val", user);

      axios.post("http://127.0.0.1:5000/login", user).then((res) => {
        alert(res.data.message);
        console.log("res", res);
        let user = {
          FirstName: res.data.FirstName,
          LastName: res.data.LastName,
        };
        setUserState(user);
        navigate("/InstructionPage", { replace: true });
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
      <Title text={"Login"} textAlign={"center"} />

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
          Login
        </Button>
        <NavLink to="/register">Not yet registered? Register Now</NavLink>
      </Box>
    </Stack>
  );
};

export default Login;
