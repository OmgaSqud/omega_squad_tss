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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import SubjectCard from "./SubjectCard";
import CardColorFilter from "../utilities/CardColorFilter";
import DaysMapper from "../utilities/DaysMapper";

const Timetable = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
  }));

  const Headers = [
    "Time",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ];
  const timeperiods = [
    "07:50-08:30",
    "08:30-09:10",
    "09:10-09:50",
    "09:50-10:30",
    "INTERVAL",
    "10:50-11:30",
    "11:30-12:10",
    "12:10-12:50",
    "12:50-01:30",
  ];

  const [subjects, setSubjects] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

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
      console.log("No such document!");
    }
  };

  const fetchTimeslots = async () => {
    const q = query(collection(db, "timeslots"));
    let arr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      arr.push({
        class: data.class,
        day: data.day,
        period: data.period,
        subject: data.subject,
      });
    });
    arr = arr.sort(function (a, b) {
      return DaysMapper(a.day) - DaysMapper(b.day);
    });
    setTimeslots(arr);
    console.log(timeslots);
  };

  const SlotMapper = (Period) => {
    let row = [];
    let value = [];
    for (let i = 0; i < 5; i++) {
      value = timeslots.find(
        (element) => DaysMapper(element.day) === i && element.period == Period
      );
      row.push(
        <TableCell
          align="center"
          sx={{ backgroundColor: !Period ? "#8CD4CD" : null }}
        >
          {value ? (
            // <SubjectCard
            //   subject={value.subject+"\n"+value.class}
            //   bgcolor={CardColorFilter(value.subject)}
            // />
            <Grid item xs={2} sm={4} md={4} columns={1}>
              <Item
                sx={{
                  backgroundColor: CardColorFilter(value.subject),
                }}
              >
                {value.subject + "\n" + value.class}
              </Item>
            </Grid>
          ) : null}
        </TableCell>
      );
    }
    return row;
  };

  useEffect(() => {
    fetchSubjects();
    fetchTimeslots();
  }, []);

  return (
    <Box style={{ backgroundColor: "#D2DBEB", height: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
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
              position: "absolute",
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Headers.map((heading) => (
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", backgroundColor: "#8CD4CD" }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeperiods.map((slot, index) => (
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", backgroundColor: "#8CD4CD" }}
                    >
                      {slot}
                    </TableCell>
                    {SlotMapper(
                      slot === "INTERVAL" ? null : index < 4 ? index + 1 : index
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Main>
      </Box>
    </Box>
  );
};

export default Timetable;
