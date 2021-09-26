import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const ConfirmModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#DCE8F1",
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
              Are you sure you want to Generate & Send the zoom link?
            </p>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={props.back}
                sx={{
                  borderRadius: 2,
                  width: 100,
                  color: "white",
                  backgroundColor: "#3B91D4",
                  ":hover": { backgroundColor: "navy" },
                }}
              >
                No
              </Button>
              <Button
                onClick={props.zoom}
                sx={{
                  borderRadius: 2,
                  width: 100,
                  color: "white",
                  backgroundColor: "#3B91D4",
                  ":hover": { backgroundColor: "navy" },
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

export default ConfirmModal;
