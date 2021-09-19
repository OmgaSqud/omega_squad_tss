import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const LinkTab = (props) => {
    return (
      <Tab
        sx={{ color: "white" }}
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1E2A83", height: "10vh" }}
      >
        <Toolbar>
          <img src="Logo.png" alt="" class="img-fluid" />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, marginLeft: "5%" }}
          >
            TSS
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Tabs
              textColor={"white"}
              TabIndicatorProps={{ style: { background: "#6BEFCD" } }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab label="Home" onClick={() => history.push("/")} />
              <LinkTab
                label="About"
                onClick={() => history.push("/student-view")}
              />
              <LinkTab label="Contact" href="/Contact" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
