import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const ConfirmDelete = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ECBEBE",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <React.Fragment>
      <Modal
        hideBackdrop={false}
        open={props.value}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div>
          <Box sx={{ ...style }}>
            <p id="child-modal-description">
              Are you sure you want to delete this period?
            </p>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={props.back}
                sx={{
                  borderRadius: 2,
                  width: 100,
                  color: "white",
                  backgroundColor: "#C12F2F",
                  ":hover": { backgroundColor: "#FF0000" },
                }}
              >
                No
              </Button>
              <Button
                onClick={props.delete}
                sx={{
                  borderRadius: 2,
                  width: 100,
                  color: "white",
                  backgroundColor: "#C12F2F",
                  ":hover": { backgroundColor: "#FF0000" },
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmDelete;
