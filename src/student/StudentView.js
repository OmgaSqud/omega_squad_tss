import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StudentView = () => {
  function createData(name, time, subject, teacher, protein, price) {
    return {
      name,
      time,
      subject,
      teacher,
      protein,
      price,
      link: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
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
            {row.name}
          </TableCell>
          <TableCell align="right">{row.time}</TableCell>
          <TableCell align="right">{row.subject}</TableCell>
          <TableCell align="right">{row.teacher}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  link
                </Typography>
                {/* <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.link.map((linkRow) => (
                      <TableRow key={linkRow.date}>
                        <TableCell component="th" scope="row">
                          {linkRow.date}
                        </TableCell>
                        <TableCell>{linkRow.customerId}</TableCell>
                        <TableCell align="right">
                          {linkRow.amount}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(linkRow.amount * row.price * 100) /
                            100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                <Typography
                  variant="h8"
                  color="blue"
                  sx={{ textDecoration: "underline" }}
                  gutterBottom
                  component="div"
                >
                  https://zoom.us/j/68186350212?pwd=NVF4NWt3Vnl3ZTlkb0l2NE5EbUlrUT09#success
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
      link: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };

  const rows = [
    createData("10/09/2021", "9.00 A.M", "Physics", "Mr. K.T. Rathnayake"),
    createData("10/09/2021", "10.40 A.M", "Com.Maths", "Mr. S.S. Dissanayake"),
    createData("10/09/2021", "12.00 P.M", "English", "Mrs. N. Rajapakse"),
    createData("11/09/2021", "8.20 A.M", "Chemistry", "Mrs. H.L.B. Herath"),
    createData("11/09/2021", "9.00 A.M", "Com.Maths", "Mr. K.T. Rathnayake"),
  ];

  // /*export default function CollapsibleTable() {*/
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100vw",
        bgcolor: "#D2DBEB",
        padding: "50px",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom component="div">
          My Shedule
        </Typography>
      </Box>
      <TableContainer component={Paper} class="container">
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#343A40" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "white" }}>Date</TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Time
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Subject
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Teacher
              </TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentView;
