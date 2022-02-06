import { useContext } from "react";
import { auth } from "../firebase/Firebase";
import { AuthContext } from "../firebase/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHistory, useLocation } from "react-router";

const Navbar = () => {
  // const user = useContext(AuthContext).user.userDetails;
  const userName = window.localStorage.getItem("uname");
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

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

  const signOut = () => {
    setLoading(true);
    setTimeout(() => {
      auth.signOut();
      history.push("/");
      setLoading(false);
      window.localStorage.clear();
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#1E2A83", height: "10vh" }}
      >
        <Toolbar>
          <img
            src="Logo.jpeg"
            alt=""
            style={{ height: "100%", borderRadius: 50, padding: 5 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, marginLeft: "5%" }}
          >
            VirtuaClass
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {location.pathname === "/" || location.pathname === "/about" ? (
            <Box>
              <Tabs
                textColor={"white"}
                TabIndicatorProps={{ style: { background: "#6BEFCD" } }}
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Home" onClick={() => history.push("/")} />
                <LinkTab label="About" onClick={() => history.push("/about")} />
              </Tabs>
            </Box>
          ) : (
            <>
              <Typography sx={{ fontSize: 20, marginRight: "3%" }}>
                Welcome {userName}
              </Typography>
              <Button
                variant="contained"
                sx={{ marginRight: "2vw", backgroundColor: "darkslategray" }}
                onClick={signOut}
              >
                {loading ? "Logging out.." : "Logout"}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
