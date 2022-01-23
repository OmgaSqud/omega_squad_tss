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
import Autocomplete from "@mui/material/Autocomplete";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//---------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
import { doc, getDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
//-----------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
import { useHistory } from "react-router";
import { ButtonGroup } from "@mui/material";

const EditUser = () => {
  const history = useHistory();

  //-------------------------------------------------------------
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

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  //-----------------------------------------------------------

  const [searchArray, setSearchArray] = useState([]); // search bar data

  useEffect(() => {
    getDocs(
      query(collection(db, "users"), where("type", "==", details.type))
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        searchArray.push({ label: doc.data().name, uid: doc.id });
      });
    });
  }, [details.type]);

  const names = ["Manishyam", "Nimasha", "Vinura"];

  const [selectUser, setSelectUser] = useState({ name: "", uid: "" });

  useEffect(() => {
    console.log("user changed " + selectUser.uid);
    // if (selectUser.uid != null) {
    //   getDoc(doc(db, "users", selectUser.uid)).then((doc) => {
    //     const data = doc.data();
    //     console.log(data);
    //   });
    // }
    console.log("exist subject list");
    console.log(subjects);
    setSubjects({
      maths: false,
      chem: false,
      agr: false,
      bio: false,
      eng: false,
      ict: false,
      psc: false,
      git: false,
    });
    getDocs(
      query(collection(db, "users"), where("uid", "==", selectUser.uid))
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const userData = { ...data };
        console.log("userData: " + userData);
        if (doc.data().type == "student") {
          const grd = parseInt(doc.data().class + "");
          const cls = doc.data().class.slice(-1);
          console.log("class letter: " + cls);
          setDetails({
            uid: selectUser.uid,
            ...userData,
            grade: grd,
            class: cls,
          });
        }
        setDetails({
          uid: selectUser.uid,
          ...userData,
        });

        for (var i = 0; i < userData.subjects.length; i++) {
          if (userData.subjects[i] === "GIT") {
            setSubjects((subjects) => ({
              ...subjects,
              git: !subjects["git"],
            }));
          }
          if (userData.subjects[i] === "ICT") {
            setSubjects((subjects) => ({
              ...subjects,
              ict: !subjects["ict"],
            }));
          }
          if (userData.subjects[i] === "Maths") {
            setSubjects((subjects) => ({
              ...subjects,
              maths: !subjects["maths"],
            }));
          }
          if (userData.subjects[i] === "Aggriculture") {
            setSubjects((subjects) => ({
              ...subjects,
              agr: !subjects["agr"],
            }));
          }
          if (userData.subjects[i] === "Chemistry") {
            setSubjects((subjects) => ({
              ...subjects,
              chem: !subjects["chem"],
            }));
          }
          if (userData.subjects[i] === "Biology") {
            setSubjects((subjects) => ({
              ...subjects,
              bio: !subjects["bio"],
            }));
          }
          if (userData.subjects[i] === "English") {
            setSubjects((subjects) => ({
              ...subjects,
              eng: !subjects["eng"],
            }));
          }
          if (userData.subjects[i] === "Physics") {
            setSubjects((subjects) => ({
              ...subjects,
              psc: !subjects["psc"],
            }));
          }
        }
        console.log(subjects);
        console.log(details);
      });
    });
  }, [selectUser]);

  //checkboxes
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
    setDetails((details) => ({
      ...details,
      subjects: [],
    }));
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

  const setSubjectValue = (e) => {
    setSubjects((subjects) => ({
      ...subjects,
      [e.target.name]: !subjects[e.target.name],
    }));
    setArray();
    console.log(details);
  };

  //===================================

  const handleUpdate = () => {
    console.log(details);
    setArray();
    console.log(details);
    updateDoc(doc(db, "users", selectUser.uid), {
      ...details,
    });
    clear();
  };

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
          <Button onClick={() => history.push("/add-user")}>Add User</Button>
          <Button disabled>Edit User</Button>
        </ButtonGroup>
        <Box sx={{ flexGrow: 1, padding: "20px 20px 0px 60px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box sx={{ minWidth: 120, margin: "0px auto" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>

                  <Select
                    name="type"
                    labelId="type"
                    id="type"
                    label="type"
                    sx={{ backgroundColor: "white" }}
                    fullWidth
                    value={details.type}
                    onChange={(e) => {
                      setValue(e);
                      setSearchArray([]);
                    }}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ minWidth: 120, margin: "0px auto" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={details.class}
                    label="cls"
                    onChange={setValue}
                    sx={{ backgroundColor: "white" }}
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
              <Autocomplete
                // value={selectUser}
                onChange={(event, newValue) => {
                  setSelectUser(newValue);
                  console.log(newValue);
                }}
                disablePortal
                id="highlights-demo"
                sx={{
                  width: 200,
                  margin: "-16px auto 0px",
                }}
                options={searchArray}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Name"
                    margin="normal"
                    sx={{ backgroundColor: "white", borderRadius: "5px" }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/**=================================================================================================== */}

          {/* <label>User Category</label> */}
          <Box fullWidth>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  margin: "0 auto",
                  mt: 2,
                  width: "90%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                name="name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ backgroundColor: "white" }}
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
                  width: "90%",
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
                  width: "90%",
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
                                value="Maths"
                                checked={subjects.maths}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Com.Maths"
                          />

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
                                value="Aggriculture"
                                checked={subjects.agr}
                                onClick={setSubjectValue}
                              />
                            }
                            label="Aggriculture"
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

            <Stack
              spacing={40}
              direction="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Button
                variant="contained"
                sx={{ width: "100px", marginLeft: "10vh" }}
                onClick={clear}
              >
                Clear
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </Stack>
            <div></div>
          </Box>
        </Box>
        {/**=================================================================================================== */}
      </div>
    </Box>
  );
};

export default EditUser;
