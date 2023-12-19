import React from "react";
import { Grid } from "@mui/material";
// icons
import imgDetail3 from "../assets/vket3bl9.png";

// components
import Title from "./Title";
import Paragraph from "./Paragraph";

const Content = () => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
        px: 2,
      }}
    >
      <Grid item xs={12} sm={10} md={4} component="section">
        <Title text={"Symptoms"} textAlign={"start"} />

        <Paragraph
          text={
            "Different people have different symptoms of breast cancer. Some people do not have any signs or symptoms at all."
          }
          maxWidth={"75%"}
          mx={0}
          textAlign={"start"}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={5}>
        <img
          src={imgDetail3}
          alt=""
          style={{
            backgroundColor: "#008080",
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Content;
