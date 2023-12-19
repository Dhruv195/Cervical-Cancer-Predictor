import React from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import FooterTitle from "./FooterTitle";
import FooterLink from "./FooterLink";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const StackColumn = styled(Stack)(() => ({
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    gap: 8,
    textAlign: "center",
  }));

  const BoxRow = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ededed",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      gap: 30,
    },
  }));

  return (
    <BoxRow
      component="footer"
      sx={{
        py: 4,
        px: 2,
      }}
    >
      <StackColumn>
        <FooterTitle text={"About"} />
        <FooterLink
          text={
            "This site is made for purpose of spreading awareness related to Cervical Cancer This site is open source and the source code can be found here."
          }
        />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={"Quick Links"} />
        <Link
          href="/"
          variant="body2"
          sx={{
            color: "#414141",
            "&:hover": {
              color: "#1c2859",
            },
          }}
        >
          Home
        </Link>
        <Link
          href="/symptoms"
          variant="body2"
          sx={{
            color: "#414141",
            "&:hover": {
              color: "#1c2859",
            },
          }}
        >
          Symptoms{" "}
        </Link>
        <Link
          href="/contact"
          variant="body2"
          sx={{
            color: "#414141",
            "&:hover": {
              color: "#1c2859",
            },
          }}
        >
          Contact{" "}
        </Link>
        <Link
          href="/FAQs"
          variant="body2"
          sx={{
            color: "#414141",
            "&:hover": {
              color: "#1c2859",
            },
          }}
        >
          FAQs
        </Link>
        <Link
          href="/login"
          variant="body2"
          sx={{
            color: "#414141",
            "&:hover": {
              color: "#1c2859",
            },
          }}
        >
          Signin / Signup
        </Link>
      </StackColumn>

      <StackColumn flexDirection={"row"}>
        <Stack
          direction="row"
          width="70px"
          maxWidth="100%"
          justifyContent="space-between"
        >
          <Link
            href="#"
            variant="body2"
            sx={{
              color: "#414141",
              "&:hover": {
                color: "#1c2859",
              },
            }}
          >
            <InstagramIcon />
          </Link>
          <Link
            href="#"
            variant="body2"
            sx={{
              color: "#414141",
              "&:hover": {
                color: "#1c2859",
              },
            }}
          >
            <FacebookIcon />
          </Link>
          <Link
            href="#"
            variant="body2"
            sx={{
              color: "#414141",
              "&:hover": {
                color: "#1c2859",
              },
            }}
          >
            <LinkedInIcon />
          </Link>
        </Stack>
        <Typography variant="caption" component="p">
          Copyright © 2024 No Rights Reserved by Cervical Cancer Awareness
          Program.
        </Typography>
      </StackColumn>
    </BoxRow>
  );
};

export default Footer;
