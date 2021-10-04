import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box
        // class="credits"
        style={{ fontStyle: "italic" }}
        sx={{
          height: "5vh",
          backgroundColor: "#11184c",
          color: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10vw",
        }}
      >
        Designed by Omega_Squad
      </Box>
    </footer>
  );
};

export default Footer;
