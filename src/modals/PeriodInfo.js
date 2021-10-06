import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dropdown from "../shared/Dropdown";

const PeriodInfo = (props) => {
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

  const [Grade, setGrade] = useState();
  const [Class, setClass] = useState();
  const [changeData, setChangeData] = useState(false);

  const handleChange = (event) => {
    setChangeData(true);
    setGrade(event.target.value);
  };

  const handleChange2 = (event) => {
    setChangeData(true);
    setClass(event.target.value);
  };

  const Save = props.save;
  const Generate = props.generate;

  useEffect(() => {
    setChangeData(false);
    setGrade();
    setClass();
    if (props.Grade && props.Class) {
      setGrade(props.Grade);
      setClass(props.Class);
    }
  }, [props.Grade, props.Class]);

  return (
    <Modal
      open={props.value}
      disableEscapeKeyDown={true}
      onClose={() => setGrade() + setClass() + setChangeData(false)}
      onBackdropClick={props.backdrop}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div>
        <Box sx={{ ...style }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h2 id="parent-modal-title">{props.Title}</h2>
            {props.Grade && props.Class && props.ID && (
              <Button
                onClick={props.delete}
                sx={{
                  alignSelf: "center",
                  height: 35,
                  borderRadius: 2,
                  color: "white",
                  backgroundColor: "#C12F2F",
                  ":hover": { backgroundColor: "#FF0000" },
                }}
              >
                Delete Period
              </Button>
            )}
          </Box>
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
              onClick={async () =>
                (await Generate(Grade, Class)) + (!Grade && !Class) &&
                setGrade() + setClass()
              }
              sx={{
                borderRadius: 2,
                color: "white",
                backgroundColor: "#3B91D4",
                ":hover": { backgroundColor: "navy" },
              }}
            >
              {props.btnName}
            </Button>
            <Button
              disabled={changeData === true ? false : true}
              onClick={async () =>
                (await Save(Grade, Class)) + !props.Grade &&
                !props.Class &&
                setGrade() + setClass()
              }
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

export default PeriodInfo;
