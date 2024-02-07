// src/components/InstructionPage.js
import React from "react";
import "./InstructionPage.css"; // Import the CSS file
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Stack, Typography } from "@mui/material";

import axios from "axios";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CancerInfo from "./CancerInfo";
import { tabTitle } from "../App";

const InstructionPage = ({ FirstName, LastName }) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState("");

  tabTitle("Instruction | Cervical Cancer Awareness");

  const [percentage, setPercentage] = useState(0);

  const handleClick = () => {
    setUploading(true);
    setPercentage(0);

    console.log("Image:", image);

    const formData = new FormData();
    formData.append("file", image);

    axios
      .post("http://127.0.0.1:5000/modelpredict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Upload Progress: " + percentage + "%");
          const interval = setInterval(() => {
            // Increase percentage by 10% until it reaches 100%
            setPercentage((prevPercentage) =>
              prevPercentage < 100 ? prevPercentage + 20 : 100
            );
          }, 1000); // Adjust the interval duration as needed (in milliseconds)

          // Clean up the interval on component unmount
          return () => clearInterval(interval);
        },
      })
      .then(({ data }) => {
        console.log("res", data);
        setInfo(data.prediction);
        setImage(data.file);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setImage(null); // Reset image after upload, regardless of success or failure
        setUploading(false);
      });
  };

  const handleClear = () => {
    setInfo(""); // Clear the info state
  };

  return (
    <div className="firstbody">
      <div className="instruction-container">
        <Button
          style={{
            backgroundColor: "red",
            color: "white",
            float: "right",
          }}
          startIcon={<BackspaceIcon />}
          href="/login"
        >
          Exit
        </Button>
        <h2 style={{ color: "Black" }}>
          Welcome {FirstName} {LastName} !!
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
            {uploading && (
              <>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{ width: "100%", marginBottom: 3, marginTop: 3 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {percentage}% Uploaded
                </Typography>
              </>
            )}
            {!uploading ? (
              <>
                <CloudUploadIcon
                  sx={{
                    fontSize: "100px",
                    color: "rgba(0,0,0,0.3)",
                  }}
                />

                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ marginBottom: 3 }}
                  >
                    Choose the Image
                  </Button>
                </label>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded file"
                    style={{
                      width: "20%",
                      height: "20%",
                    }}
                  />
                )}
              </>
            ) : null}
            <Button
              variant="contained"
              className="UploadButton"
              disabled={uploading}
              sx={{ marginTop: 3 }}
              onClick={handleClick}
            >
              Upload
            </Button>
          </Box>

          <div className="ResultBox">
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                float: "right",
              }}
              onClick={handleClear}
            >
              Clear
            </Button>
            <div>
              <h1>Cervical Image Classification Information</h1>
              <CancerInfo className={info} />
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default InstructionPage;
