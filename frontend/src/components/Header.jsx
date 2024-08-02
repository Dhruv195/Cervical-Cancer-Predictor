import React from "react";
import { Box, styled } from "@mui/material";
//img
// import headerImg from "../assets/pexels-photo-579474.jpeg";
import "./Styles.css";

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    // backgroundColor: "#F7567C",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(48),
    },
  }));

  return (
    <CustomBox component="header">
      {/*  Box text  */}
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            flex: "1",
            alignSelf: "center",
          },
          [theme.breakpoints.up("md")]: {
            flex: "2",
            alignSelf: "flex-end",
          },
        })}
      >
        <div className="containerStyle">
          <BoxText
            component="section"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: "400px", // Set a minimum height or adjust as needed
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
            }}
          ></BoxText>
        </div>
      </Box>
    </CustomBox>
  );
};

export default Header;
