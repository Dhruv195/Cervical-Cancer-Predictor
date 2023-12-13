import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import Title from "./Title";
// img
import imgDetail from "../assets/statics_map.jpg";
import imgDetail2 from "../assets/chart.jpg";
import imgDetail3 from "../assets/o63jkjem.png";
import imgDetail4 from "../assets//20200925_210520.jpg";

const GetStarted = () => {
  const CustomGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const CustomTypography = styled(Typography)({
    fontSize: "1.1rem",
    textAlign: "start",
    lineHeight: "1.5",
    color: "#515151",
    marginTop: "1.5rem",
  });

  return (
    <>
      <Title text={"Let's Talk Statistics"} textAlign={"center"} />
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          py: 6,
          px: 2,
        }}
      >
        <CustomGridItem item xs={12} sm={8} md={6} component="section">
          <Box
            component="article"
            sx={{
              px: 3,
            }}
          >
            <Title
              text={"World Cervical Cancer Incidence Rates "}
              textAlign={"start"}
            />
            <CustomTypography>
              According to a survey published by IARC, In January 2022, I don't
              have the most recent or real-time data on cervical cancer
              incidence rates worldwide. Cervical cancer incidence rates can
              vary across countries and regions due to factors such as
              healthcare infrastructure, access to screening programs,
              vaccination rates against human papillomavirus (HPV), and other
              demographic variables.
            </CustomTypography>
          </Box>
        </CustomGridItem>

        <Grid item xs={12} sm={4} md={6}>
          <img
            src={imgDetail}
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <div className="section2">
          <CustomGridItem item xs={12} sm={8} md={6} component="section">
            <Box
              component="article"
              sx={{
                px: 3,
              }}
            >
              <Title text={"Cervical Cancer Frequency"} textAlign={"start"} />
              <CustomTypography>
                According to WHO Cervical cancer is the most frequent cancer
                among women, impacting 2.1 million women each year, and also
                causes the greatest number of cancer-related deaths among women.
                In 2018, it is estimated that 627,000 women died from cervical
                cancer – that is approximately 15% of all cancer deaths among
                women.
              </CustomTypography>
            </Box>
          </CustomGridItem>

          <Grid item xs={12} sm={10} md={6}>
            <img
              src={imgDetail2}
              alt=""
              style={{
                width: "100%",
              }}
            />
          </Grid>
        </div>

        <CustomGridItem item xs={12} sm={8} md={6} component="section">
          <Box
            component="article"
            sx={{
              px: 3,
            }}
          >
            <Title
              text={"Age increase the risk of cervical cancer"}
              textAlign={"start"}
            />
            <CustomTypography>
              The older we are, the more likely abnormal changes will occur in
              our cells. When many of these changes occur, cancer can develop.
            </CustomTypography>
          </Box>
        </CustomGridItem>
        <Grid item xs={12} sm={4} md={6}>
          <img
            src={imgDetail3}
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <CustomGridItem item xs={12} sm={8} md={6} component="section">
          <Box
            component="article"
            sx={{
              px: 3,
            }}
          >
            <Title
              text={"Cancer Mortality rate in Women"}
              textAlign={"start"}
            />
            <CustomTypography>
              Cervical Cancer has the 3nd highest mortality rate in women.
            </CustomTypography>
          </Box>
        </CustomGridItem>
        <Grid item xs={12} sm={4} md={6}>
          <img
            src={imgDetail4}
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GetStarted;
