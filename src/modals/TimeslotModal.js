import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dropdown from "../shared/Dropdown";

const TimeslotModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 350,
    bgcolor: "#A0B6C7",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const Grades = [6, 7, 8, 9, 10, 11, 12, 13];
  const Classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  const [Grade, setGrade] = React.useState();
  const [Class, setClass] = React.useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleChange2 = (event) => {
    setClass(event.target.value);
  };

  const Save = props.save;
  return (
    <Modal
      open={props.value}
      onClose={() => setGrade() + setClass("")}
      onBackdropClick={props.backdrop}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div>
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Period Details</h2>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            marginTop="10%"
          >
            <Dropdown
              InputLabel={"Select Grade"}
              value={Grade}
              Dropdownselected={handleChange}
              data={Grades}
            />
            <Dropdown
              InputLabel={"Select Class"}
              value={Class}
              Dropdownselected={handleChange2}
              data={Classes}
            />
          </Box>
          <Box display="flex" justifyContent="space-around" marginTop="15%">
            <Button
              onClick={props.generate}
              sx={{
                borderRadius: 2,
                color: "white",
                backgroundColor: "#3B91D4",
                ":hover": { backgroundColor: "navy" },
              }}
            >
              Generate Zoom Link
            </Button>
            <Button
              onClick={() => Save(Grade, Class) + setGrade() + setClass("")}
              sx={{
                borderRadius: 2,
                color: "white",
                backgroundColor: "#3B91D4",
                ":hover": { backgroundColor: "navy" },
              }}
            >
              Save Details
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default TimeslotModal;
