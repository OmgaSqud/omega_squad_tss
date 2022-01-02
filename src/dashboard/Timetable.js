import * as React from "react";
import { useState, useEffect, useContext } from "react";
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
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { AuthContext } from "../firebase/AuthContext";
import SubjectCard from "./SubjectCard";
import CardColorFilter from "../utilities/CardColorFilter";
import { DaysMapper } from "../utilities/DaysHandler";
import { DayRetriever } from "../utilities/DaysHandler";
import PeriodInfo from "../modals/PeriodInfo";
import ConfirmLink from "../modals/ConfirmLink";
import ConfirmDelete from "../modals/ConfirmDelete";
import Axios from "axios";

const Timetable = () => {
  const user = useContext(AuthContext).user.userDetails;
  // const user = {
  //   uid: "XnH9lDsLsEWqda1B1D2ScYxGu822",
  //   name: "Vinura Chandrasekara",
  //   email: "vinurachan@gmail.com",
  // };
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
    "07:50 AM - 08:30 AM",
    "08:30 AM - 09:10 AM",
    "09:10 AM - 09:50 AM",
    "09:50 AM - 10:30 AM",
    "10:30 AM - 10:50 AM",
    "10:50 AM - 11:30 AM",
    "11:30 AM - 12:10 PM",
    "12:10 PM - 12:50 PM",
    "12:50 PM - 01:30 PM",
  ];

  const [subjects, setSubjects] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [slotSubject, setSlotSubject] = useState();
  const [slotDay, setSlotDay] = useState();
  const [slotPeriod, setSlotPeriod] = useState();
  const [classroom, setClassroom] = useState();
  const [grade, setGrade] = useState();

  const [startLink, setStartLink] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [slotID, setslotID] = useState();
  const [updateslot, setUpdateslot] = useState(false);
  const [saveData, setSaveData] = useState(false);

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

  const onDrag = (subject) => {
    setSlotSubject(subject);
  };

  const onDragOver = (event, i, Period) => {
    event.preventDefault();
    setSlotDay(DayRetriever(i));
    setSlotPeriod(Period);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setModalTitle(slotSubject + " - " + slotDay + " Period " + slotPeriod);
    console.log(slotSubject + " added to " + slotDay + " Period " + slotPeriod);
    setOpenModal(true);
  };

  const zoomLink = async () => {
    let Class = grade + "-" + classroom;
    let StartTime = !updateslot
      ? timeperiods[slotPeriod <= 4 ? slotPeriod - 1 : slotPeriod].split(
          slotPeriod < 7 ? "AM" : "PM"
        )[0]
      : null;
    let period = !updateslot ? slotPeriod : null;
    let Topic = slotSubject + " " + Class;
    Axios.post("/timetable/newMeeting", {
      slotID: slotID,
      isUpdate: updateslot,
      topic: Topic,
      class: Class,
      day: slotDay,
      period: period,
      startTime: StartTime,
      subject: slotSubject,
      teacher: user.name,
    })
      .then(() => {
        setOpenModal(false);
        setOpenModal2(false);
        alert("Zoom meeting link succefully generated & sent!");
        setClassroom();
        setGrade();
        setModalTitle();
        setSaveData(!saveData);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const saveSlotData = async (Grade, Class) => {
    if (updateslot == false && Grade && Class) {
      let classroom = Grade + "-" + Class;
      let StartTime = timeperiods[
        slotPeriod <= 4 ? slotPeriod - 1 : slotPeriod
      ].split(slotPeriod < 7 ? "AM" : "PM")[0];
      console.log(
        slotSubject +
          " added to " +
          slotDay +
          " Period " +
          slotPeriod +
          " of Class " +
          classroom +
          " where startTime is " +
          StartTime
      );
      await addDoc(collection(db, "timeslots"), {
        dateTime: serverTimestamp(),
        class: classroom,
        day: slotDay,
        startlink: null,
        joinlink: null,
        period: slotPeriod,
        startTime: StartTime,
        subject: slotSubject,
        teacher: user.name,
      });
      setOpenModal(false);
      setClassroom();
      setGrade();
      setModalTitle();
      setSaveData(!saveData);
    } else if (!Grade || !Class) {
      alert("Select  Grade & Class to save details");
    } else if (updateslot == true) {
      let newclass = Grade + "-" + Class;
      const update = doc(db, "timeslots", slotID);
      await updateDoc(update, {
        dateTime: serverTimestamp(),
        class: newclass,
        startlink: null,
        joinlink: null,
      });
      setOpenModal(false);
      setClassroom();
      setGrade();
      setslotID();
      setUpdateslot(false);
      setModalTitle();
      setSaveData(!saveData);
    }
  };

  const viewPeriodDetails = async (i, Period) => {
    let id = timeslots.find(
      (element) => DaysMapper(element.day) == i && element.period == Period
    ).id;
    let Class = timeslots.find(
      (element) => DaysMapper(element.day) == i && element.period == Period
    ).class;
    let subject = timeslots.find(
      (element) => DaysMapper(element.day) == i && element.period == Period
    ).subject;
    let link = await timeslots.find(
      (element) => DaysMapper(element.day) == i && element.period == Period
    ).startlink;
    setUpdateslot(true);
    setslotID(id);
    setStartLink(link);
    setSlotSubject(subject);
    setGrade(Class.split("-")[0]);
    setClassroom(Class.split("-")[1]);
    setModalTitle(subject + " - " + DayRetriever(i) + " Period " + Period);
    setOpenModal(true);
  };

  const deletePeriod = async (slotID) => {
    await deleteDoc(doc(db, "timeslots", slotID));
    setSaveData(!saveData);
    setOpenModal3(false);
    setOpenModal(false);
    setslotID();
  };

  const fetchSubjects = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSubjects(docSnap.data().subjects);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const fetchTimeslots = async () => {
    const q = query(
      collection(db, "timeslots"),
      where("teacher", "==", user.name)
    );
    let arr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      arr.push({
        id: doc.id,
        class: data.class,
        day: data.day,
        startlink: data.startlink,
        joinlink: data.joinlink,
        period: data.period,
        subject: data.subject,
      });
    });
    arr = arr.sort(function (a, b) {
      return DaysMapper(a.day) - DaysMapper(b.day);
    });
    setTimeslots(arr, console.log(timeslots));
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
          sx={{
            backgroundColor: !Period ? "#8CD4CD" : null,
            width: 150,
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: i === 2 && !Period ? "italic" : null,
          }}
        >
          {value ? (
            <Grid
              item
              alignSelf={"center"}
              // eslint-disable-next-line no-loop-func
              onClick={() => viewPeriodDetails(i, Period)}
            >
              <Item
                sx={{
                  backgroundColor: CardColorFilter(value.subject),
                  height: 50,
                  ":hover": { backgroundColor: "lightskyblue" },
                }}
              >
                <Typography>{value.subject + "  " + value.class}</Typography>
              </Item>
            </Grid>
          ) : Period ? (
            <div
              onDrop={(event) => onDrop(event)}
              onDragOver={(event) => onDragOver(event, i, Period)}
            >
              <Grid item alignSelf={"center"}>
                <Item
                  sx={{
                    backgroundColor: "#DBE0DF",
                    height: 45,
                  }}
                >
                  <Typography></Typography>
                </Item>
              </Grid>
            </div>
          ) : (
            i === 2 && "INTERVAL"
          )}
        </TableCell>
      );
    }
    return row;
  };

  useEffect(() => {
    fetchSubjects();
    fetchTimeslots();
  }, [saveData]);

  return (
    <Box
      style={{ backgroundColor: "#D2DBEB", height: "100%", paddingBottom: 30 }}
    >
      <Box sx={{ display: "flex", marginTop: "10vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ top: "10vh", backgroundColor: "#b6c1bf", color: "black" }}
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
              position: "fixed",
              top: "10vh",
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#34495e",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{ color: "white", fontSize: 22, marginLeft: "30%" }}
            >
              Subjects
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "white" }} />
          <Box style={{ marginTop: 10, alignSelf: "center" }}>
            {subjects.map((subject, index) => (
              <div draggable={true} onDragStart={() => onDrag(subject)}>
                <SubjectCard
                  subject={subject}
                  bgcolor={CardColorFilter(subject)}
                />
              </div>
            ))}
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Headers.map((heading) => (
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: 20,
                        fontWeight: "bold",
                        backgroundColor: "#8CD4CD",
                        width: heading === "Time" ? 130 : 150,
                      }}
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
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#8CD4CD",
                      }}
                    >
                      {slot}
                    </TableCell>
                    {SlotMapper(
                      index === 4 ? null : index < 4 ? index + 1 : index
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Main>
        <PeriodInfo
          Title={modalTitle}
          value={openModal}
          btnName={startLink ? "Join Zoom Class" : "Create Zoom Link"}
          backdrop={() =>
            setOpenModal(false) +
            setClassroom() +
            setGrade() +
            setModalTitle() +
            setStartLink(null) +
            setUpdateslot(false) +
            setslotID()
          }
          save={(Grade, Class) => saveSlotData(Grade, Class)}
          generate={
            startLink
              ? () =>
                  window.open(startLink, "_blank") +
                  setOpenModal(false) +
                  setStartLink(null)
              : (Grade, Class) =>
                  Grade && Class
                    ? setClassroom(Class) +
                      setGrade(Grade) +
                      setOpenModal2(true)
                    : alert("Select  Grade & Class to save details")
          }
          delete={() => setOpenModal3(true)}
          Grade={grade}
          Class={classroom}
          ID={slotID}
        />
        <ConfirmLink
          value={openModal2}
          back={() => setOpenModal2(false)}
          zoom={() => zoomLink()}
        />
        <ConfirmDelete
          value={openModal3}
          back={() => setOpenModal3(false)}
          delete={async () =>
            (await deletePeriod(slotID)) +
            setClassroom() +
            setGrade() +
            setStartLink(null) +
            setUpdateslot(false)
          }
        />
      </Box>
    </Box>
  );
};

export default Timetable;
