import { Typography } from "@mui/material";
import React from "react";

const Title = ({ text, textAlign }) => {
  return (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        fontWeight: "700",
        letterSpacing: "-1px",
        textAlign: textAlign,
        paddingTop: "20px",
      }}
    >
      {text}
    </Typography>
  );
};

export default Title;
