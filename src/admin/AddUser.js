import React from "react";
import { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase/Firebase";
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

//-------------------------------------------------------------------------------
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";
import { ButtonGroup } from "@mui/material";

const AddUser = () => {
  const history = useHistory();
  const clear = () => {
    setDetails({
      name: "",
      email: "",
      password: "",
      type: "",
      subjects: [],
      grade: "",
      class: "",
    });
  };

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    subjects: [],
    grade: "",
    class: "",
  });
  //---------------------------------------------------

  const handleAddUser = () => {
    console.log(details);
    setArray();
    console.log(details);
    //===============================
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (details.type == "student") {
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: details.name,
            email: details.email,
            password: details.password,
            type: details.type,
            class: details.grade + "-" + details.class,
          });
        } else if (details.type == "teacher") {
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: details.name,
            email: details.email,
            password: details.password,
            type: details.type,
            subjects: details.subjects,
          });
        } else if (details.type == "admin") {
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: details.name,
            email: details.email,
            password: details.password,
            type: details.type,
          });
        }
        console.log("created");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    //==============================

    //------------------------------------------------------
  };

  const [subjects, setSubjects] = useState({
    maths: false,
    chem: false,
    agr: false,
    bio: false,
    eng: false,
    ict: false,
    psc: false,
    git: false,
  });

  const setArray = (e) => {
    // subjects.forEach((element) => {
    //   setDetails((details) => ({ ...details.subjects.push(element) }));
    // });
    if (subjects.maths) {
      details.subjects.push("Maths");
    }
    if (subjects.agr) {
      details.subjects.push("Aggriculture");
    }
    if (subjects.bio) {
      details.subjects.push("Biology");
    }
    if (subjects.chem) {
      details.subjects.push("Chemistry");
    }
    if (subjects.eng) {
      details.subjects.push("English");
    }
    if (subjects.git) {
      details.subjects.push("GIT");
    }
    if (subjects.ict) {
      details.subjects.push("ICT");
    }
    if (subjects.psc) {
      details.subjects.push("Physics");
    }
  };

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const setSubjectValue = (e) =>
    setSubjects((subjects) => ({
      ...subjects,
      [e.target.name]: !subjects[e.target.name],
    }));

  return (
    <Box
      sx={{ marginTop: "10vh", height: "85vh", width: "100vw", flexGrow: 1 }}
    >
      <div class="block" style={{ marginTop: "3vh" }}>
        <ButtonGroup
          fullWidth
          variant="text"
          size="large"
          aria-label="outlined button group"
        >
          <Button disabled>Add User</Button>
          <Button onClick={() => history.push("/edit-user")}>Edit User</Button>
        </ButtonGroup>
        <Box>
          <Box sx={{ padding: "20px" }}>
            {/* <label>User Category</label> */}
            <Box sx={{ width: "80%", margin: "0 auto" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  name="type"
                  labelId="demo-simple-select-label"
                  id="type"
                  label="newUser"
                  sx={{ backgroundColor: "white" }}
                  fullWidth
                  value={details.type}
                  onChange={setValue}
                >
                  <MenuItem value={"teacher"}>Teacher</MenuItem>
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  margin: "0 auto",
                  mt: 2,
                  ml: "10%",
                  width: "80%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                name="name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                fullWidth
                value={details.name}
                onChange={setValue}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  margin: "0 auto",
                  mt: 2,
                  ml: "10%",
                  width: "80%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                name="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                fullWidth
                value={details.email}
                onChange={setValue}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  margin: "0 auto",
                  mt: 2,
                  ml: "10%",
                  width: "80%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                value={details.password}
                onChange={setValue}
              ></TextField>
            </Box>

            {details.type === "student" ? (
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
                          name="grade"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="grade"
                          sx={{ backgroundColor: "white" }}
                          value={details.grade}
                          onChange={setValue}
                        >
                          <MenuItem value={"6"}>6</MenuItem>
                          <MenuItem value={"7"}>7</MenuItem>
                          <MenuItem value={"8"}>8</MenuItem>
                          <MenuItem value={"9"}>9</MenuItem>
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
                          name="class"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="class"
                          sx={{ backgroundColor: "white" }}
                          value={details.class}
                          onChange={setValue}
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
              details.type === "teacher" && (
                <Box sx={{ marginTop: "20px" }}>
                  <label style={{ margin: "20px 10%", fontWeight: "bold" }}>
                    Subjects
                  </label>
                  <Box sx={{ flexGrow: 1, marginLeft: "10%" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="maths"
                                id="maths"
                                value="Com.Maths"
                                checked={subjects.maths}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Com.Maths"
                          />
                          {/*<p>maths: {subjects.maths ? "true" : "false"}</p>*/}
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="chem"
                                id="chem"
                                value="Chemistry"
                                checked={subjects.chem}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Chemistry"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="agr"
                                id="agr"
                                value="Agriculture"
                                checked={subjects.agr}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Agriculture"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="bio"
                                id="bio"
                                value="Biology"
                                checked={subjects.bio}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Biology"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="eng"
                                id="eng"
                                value="English"
                                checked={subjects.eng}
                                onClick={setSubjectValue}
                              />
                            }
                            label="English"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="ict"
                                id="ict"
                                value="ICT"
                                checked={subjects.ict}
                                onClick={setSubjectValue}
                              />
                            }
                            label="ICT"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="psc"
                                id="psc"
                                value="Physics"
                                checked={subjects.psc}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Physics"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="git"
                                id="git"
                                value="GIT"
                                checked={subjects.git}
                                onClick={setSubjectValue}
                              />
                            }
                            label="GIT"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )
            )}

            <Stack spacing={40} direction="row" style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                sx={{ width: "100px", marginLeft: "10vh" }}
                onClick={clear}
              >
                Clear
              </Button>
              <Button variant="contained" onClick={handleAddUser}>
                Add User
              </Button>
            </Stack>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default AddUser;
