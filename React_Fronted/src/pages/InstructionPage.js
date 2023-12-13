// src/components/InstructionPage.js
import React from "react";
import "./InstructionPage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useState } from "react";

const InstructionPage = ({ setUserState, FirstName, LastName }) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (image) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      console.log("inp", formData);
      axios
        .post(URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          console.log("res", data);
          const d = data.prediction.split("_").join(" ").toUpperCase();
          setValue(d);
          setImage("");
          setUploading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setValue("Oops! Some Error Occured");
          setImage("");
          setUploading(false);
        });
    }
  };
  return (
    <>
      <div className="instruction-container">
        <h2 style={{ color: "Black" }}>
          Welcome {FirstName}
          {LastName} !!
        </h2>

        <h1>Instructions for Cervical Cancer Prediction</h1>
        <p>
          Follow these steps to predict cervical cancer using image
          classification:
        </p>
        <ol>
          <li>
            <strong>Step 1:</strong> Upload an image of the cervical region
            using the provided form.
          </li>
          <li>
            <strong>Step 2:</strong> Wait for the system to process the image
            and provide the prediction results.
          </li>
          {/* Add more steps as needed */}
        </ol>

        <Stack
          component="section"
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            py: 5,
            px: 5,
          }}
        >
          <Box className="ActionBox">
            <Typography
              variant="h5"
              component="h4"
              sx={{ marginBottom: 3, marginTop: 3 }}
              color="primary"
            >
              Upload The Image For Classification
            </Typography>

            {!uploading ? (
              <>
                <CloudUploadIcon
                  sx={{
                    fontSize: "100px",
                    color: "rgba(0,0,0,0.3)",
                    marginBottom: 3,
                    marginTop: 3,
                  }}
                />
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </>
            ) : (
              <CircularProgress />
            )}

            <Button
              variant="contained"
              className="UploadButton"
              sx={{ marginBottom: 3, marginTop: 3 }}
              disabled={uploading}
              onClick={(e) => handleClick(e)}
            >
              Upload
            </Button>
            {value ? (
              <Box className="ResultBox" sx={{ marginBottom: 3, marginTop: 3 }}>
                <Typography
                  sx={{ border: "primary" }}
                  variant="h5"
                  color="primary"
                  m={0.5}
                >
                  {value}
                </Typography>
                <CancelIcon
                  className="Cancel"
                  onClick={() => {
                    setValue("");
                  }}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default InstructionPage;
