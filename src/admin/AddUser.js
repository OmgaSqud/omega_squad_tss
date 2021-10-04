import React from "react";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/Firebase";
import { AuthContext } from "../firebase/AuthContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const AddUser = () => {
  const [newUser, setNewUser] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [cls, setCls] = React.useState("");

  const handleChange = (event) => {
    setNewUser(event.target.value);
  };
  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };
  const handleChangeClass = (event) => {
    setCls(event.target.value);
  };

  return (
    <Box
      sx={{ marginTop: "10vh", height: "90vh", width: "100vw", flexGrow: 1 }}
    >
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Box class="adminBgLeft">
            <Box textAlign="center" sx={{ paddingTop: "20vh" }}>
              <Typography variant="h5" gutterBottom component="div">
                Select Option
              </Typography>
            </Box>
            <Stack
              spacing={2}
              direction="column"
              sx={{ alignItems: "center", marginTop: "30px" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "80%",
                  backgroundColor: "#353535",
                  "&:hover": {
                    backgroundColor: "#464646",
                    // color: "#3c52b2",
                  },
                }}
              >
                Edit User
              </Button>
              <Button
                variant="outlined"
                disabled="true"
                sx={{
                  width: "80%",
                  borderColor: "#353535",
                  color: "#353535",
                }}
              >
                Add User
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box class="adminBgRight">
            <Box textAlign="center" sx={{ paddingTop: "30px" }}>
              <Typography variant="h4" gutterBottom component="div">
                User Management
              </Typography>
            </Box>
            <Box>
              <Box sx={{ padding: "20px" }}>
                {/* <label>User Category</label> */}
                <Box sx={{ width: "80%", margin: "0 auto" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select User
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newUser}
                      label="newUser"
                      onChange={handleChange}
                      sx={{ backgroundColor: "white" }}
                    >
                      <MenuItem value={"teacher"}>Teacher</MenuItem>
                      <MenuItem value={"student"}>Student</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      margin: "0 auto",
                      mt: 2,
                      ml: 14,
                      width: "80%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      margin: "0 auto",
                      mt: 2,
                      ml: 14,
                      width: "80%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                </Box>

                {newUser === "student" ? (
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "30%",
                            margin: "20px 20%",
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select Grade
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={grade}
                              label="grade"
                              sx={{ backgroundColor: "white" }}
                              onChange={handleChangeGrade}
                            >
                              <MenuItem value={"6"}>6</MenuItem>
                              <MenuItem value={"7"}>7</MenuItem>
                              <MenuItem value={"8"}>8</MenuItem>9{" "}
                              <MenuItem value={"10"}>10</MenuItem>
                              <MenuItem value={"11"}>11</MenuItem>
                              <MenuItem value={"12"}>12</MenuItem>
                              <MenuItem value={"13"}>13</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "30%",
                            margin: "20px 10%",
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select class
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={cls}
                              label="class"
                              sx={{ backgroundColor: "white" }}
                              onChange={handleChangeClass}
                            >
                              <MenuItem value={"A"}>A</MenuItem>
                              <MenuItem value={"B"}>B</MenuItem>
                              <MenuItem value={"C"}>C</MenuItem>
                              <MenuItem value={"D"}>D</MenuItem>
                              <MenuItem value={"E"}>E</MenuItem>
                              <MenuItem value={"F"}>F</MenuItem>
                              <MenuItem value={"G"}>G</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  newUser === "teacher" && (
                    <Box sx={{ marginTop: "20px" }}>
                      <label style={{ margin: "20px 10%", fontWeight: "bold" }}>
                        Subjects
                      </label>
                      <Box sx={{ flexGrow: 1, marginLeft: "10%" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Com.Maths"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Chemistry"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Agriculture"
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Biology"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="English"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="ICT"
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Physics"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="GIT"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )
                )}

                <Stack spacing={2} direction="row" sx={{ margin: "20px 40%" }}>
                  <Button variant="contained" sx={{ width: "100px" }}>
                    Clear
                  </Button>
                  <Button variant="contained">Add User</Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUser;
