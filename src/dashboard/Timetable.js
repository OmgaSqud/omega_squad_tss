import * as React from "react";
import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import SubjectCard from "./SubjectCard";
import CardColorFilter from "../utilities/CardColorFilter";

const Timetable = () => {
  const [subjects, setSubjects] = useState([]);

  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchSubjects = async () => {
    const docRef = doc(db, "users", "kzo1LcZvI84BgZfHkkQK");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSubjects(docSnap.data().subjects);
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Box style={{ backgroundColor: "#D2DBEB", height: "90vh" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ top: "10vh", backgroundColor: "#8D9F98", color: "black" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Typography variant="h4" noWrap component="div" fontWeight="bold">
              My Timetable
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              top: "10vh",
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#8D9F98",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography
              sx={{ color: "white", fontSize: 22, textAlign: "center" }}
            >
              {" "}
              Select Subject{" "}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "black" }} />
          <Box style={{ marginTop: 10, alignSelf: "center" }}>
            {subjects.map((subject, index) => (
              <SubjectCard
                subject={subject}
                bgcolor={CardColorFilter(subject)}
              />
            ))}
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <div>Timetable Grid</div>
        </Main>
      </Box>
    </Box>
  );
};

export default Timetable;
