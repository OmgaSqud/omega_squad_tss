import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { collection, getDocs, query, where } from "firebase/firestore";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/Firebase";
import { AuthContext } from "../firebase/AuthContext";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";

const StudentView = () => {
  const user = useContext(AuthContext);
  const userDetails = user.user.userDetails;
  const history = useHistory();

  //----------------------------------------------------Table----------------------------------------------------
  const [rows, setRows] = useState([]);

  const currentDate = new Date();
  var options = { weekday: "long" };
  const today = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  const [todayValue, setTodayValue] = useState(0);

  function createData(date, time, subject, teacher, joinlink, dateTime) {
    return {
      date,
      time,
      subject,
      teacher,
      joinlink,
      dateTime,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.date}
          </TableCell>
          <TableCell align="center">{row.time}</TableCell>
          <TableCell align="center">{row.subject}</TableCell>
          <TableCell align="center">{row.teacher}</TableCell>
          <TableCell align="center">
            {getDayValue(row.date) < todayValue ? (
              <Button variant="text" disabled>
                Completed
              </Button>
            ) : row.joinlink == null ? (
              <Button variant="text" disabled>
                Pending
              </Button>
            ) : (
              <Button
                key={row.date}
                variant="contained"
                href={row.joinlink}
                target="_blank"
                sx={{ width: "50%" }}
              >
                Join
              </Button>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Joinlink
                </Typography>

                <Typography
                  variant="h8"
                  color="blue"
                  sx={{ textDecoration: "underline" }}
                  gutterBottom
                  component="div"
                  href={row.joinlink}
                  target="_blank"
                >
                  <a href={row.joinlink} target="_blank" rel="noreferrer">
                    {row.joinlink}
                  </a>
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      time: PropTypes.string.isRequired,
      teacher: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      joinlink: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  };
  //-------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------Pagination----------------------------------------------------
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  //------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------Select Bar------------------------------------------------
  const [filter, setFilter] = React.useState("today");

  const handleChangeSelect = (event) => {
    setFilter(event.target.value);
  };
  //------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------Functions and Queries--------------------------------------

  const getDayValue = (day) => {
    switch (day) {
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;

      default:
        break;
    }
  };

  const fetchDetails = async () => {
    setRows([]);
    let q;
    if (filter === "today") {
      q = query(
        collection(db, "timeslots"),
        where("class", "==", userDetails.class),
        where("day", "==", today)
      );
    } else {
      q = query(
        collection(db, "timeslots"),
        where("class", "==", userDetails.class)
      );
    }

    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // doc.data() is never undefined for query doc snapshots

      array.push(
        createData(
          data.day,
          data.startTime,
          data.subject,
          data.teacher,
          data.joinlink,
          data.dateTime
        )
      );
    });
    // array.sort(function (a, b) {
    //   var c = new Date(a.dateTime);
    //   var d = new Date(b.dateTime);
    //   return c - d;
    // });
    array.sort((a, b) => (getDayValue(a.date) > getDayValue(b.date) ? 1 : -1));
    setRows(array);
  };

  useEffect(() => {
    userDetails && fetchDetails();
    setTodayValue(getDayValue(today));
  }, [filter, userDetails]);

  //----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------Render-----------------------------------------------
  return (
    <Box
      sx={{
        marginTop: "10vh",
        height: "85vh",
        width: "100vw",
        bgcolor: "#D2DBEB",
        padding: "40px 50px",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4" component="div">
          My Schedule
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ width: "80%", margin: "0 auto" }}>
        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }} class="selectBar">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="filter"
                onChange={handleChangeSelect}
              >
                <MenuItem value={"today"}>Today</MenuItem>
                <MenuItem value={"this week"}>This Week</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper} class="studentContainer">
            <Table aria-label="collapsible table">
              <TableHead style={{ backgroundColor: "#343A40" }}>
                <TableRow>
                  <TableCell />
                  <TableCell style={{ color: "white" }}>Date</TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Time
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Subject
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Teacher
                  </TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Meeting
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <Row key={row.date} row={row} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[2, 4]}
              count={rows.length}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>

      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          sx={{ margin: "auto", marginTop: "20px" }}
          onClick={() =>
            console.log(
              rowsPerPage,
              filter,
              userDetails.class,
              todayValue,
              today,
              rows
            )
          }
        >
          Test
        </Button>
      </Stack>
    </Box>
  );
};

export default StudentView;
