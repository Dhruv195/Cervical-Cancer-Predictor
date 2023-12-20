// src/components/InstructionPage.js
import React from "react";
import "./InstructionPage.css"; // Import the CSS file
import { MDBInputGroup } from "mdb-react-ui-kit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import BackspaceIcon from "@mui/icons-material/Backspace";
import IconButton from "@mui/material/IconButton";

const InstructionPage = ({ setUserState, FirstName, LastName }) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");

  const [percentage, setPercentage] = useState(0);

  const handleClick = () => {
    setUploading(true);
    setPercentage(0);

    console.log("Image:", image);

    const formData = new FormData();
    formData.append("file", image);

    axios
      .post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Upload Progress: " + percentage + "%");
          setPercentage(percentage);
        },
      })
      .then(({ data }) => {
        console.log("res", data);
        const d = data.prediction.split("_").join(" ").toUpperCase();
        setValue(d);
      })
      .catch((err) => {
        console.log("err", err);
        setValue("Oops! Some Error Occurred");
      })
      .finally(() => {
        setImage(null); // Reset image after upload, regardless of success or failure
        setUploading(false);
      });
  };

  return (
    <>
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
          // sx={{
          //   py: 5,
          //   px: 5,
          // }}
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
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{ width: "100%", marginBottom: 3, marginTop: 3 }}
              />
            )}
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
                  accept="image/*, .pdf, .doc"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    Choose the Image
                  </IconButton>
                </label>
                {image && (
                  <img
                    src={URL.createObjectURL(image)} // Use URL.createObjectURL to create a URL for the image
                    alt="Uploaded file"
                    style={{
                      // borderRadius: "50%",
                      width: "20%",
                      height: "100%",
                    }}
                  />
                )}
              </>
            ) : null}
            <Button
              variant="contained"
              className="UploadButton"
              sx={{ marginBottom: 3, marginTop: 3 }}
              disabled={uploading}
              onClick={(e) => handleClick(e)}
            >
              Upload
            </Button>
            {value && percentage === 100 && (
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
            )}
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default InstructionPage;
