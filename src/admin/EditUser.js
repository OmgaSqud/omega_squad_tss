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
    console.log("use changed " + selectUser.uid);
    // if (selectUser.uid != null) {
    //   getDoc(doc(db, "users", selectUser.uid)).then((doc) => {
    //     const data = doc.data();
    //     console.log(data);
    //   });
    // }
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

        console.log("details : " + details);
      });
    });
  }, [selectUser]);

  const handleUpdate = () => {
    updateDoc(doc(db, "users", selectUser.uid), {
      ...details,
    });
  };

  return (
    <Box
      sx={{
        marginTop: "10vh",
        height: "85vh",
        width: "100vw",
        backgroundColor: "#F7EAF8",
        flexGrow: 1,
      }}
    >
      <div class="block" style={{ marginTop: "3vh" }}>
        <ButtonGroup
          fullWidth
          variant="text"
          size="large"
          aria-label="outlined button group"
        >
          <Button
            onClick={() => history.push("/add-user")}
            sx={{ color: "#E91E63" }}
          >
            Add User
          </Button>
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
                                value="Com.Maths"
                                checked={
                                  details.subjects.indexOf("Com.Maths") > -1
                                }
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
                                checked={
                                  details.subjects.indexOf("Chemistry") > -1
                                }
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
                                checked={
                                  details.subjects.indexOf("Agriculture") > -1
                                }
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
                                checked={
                                  details.subjects.indexOf("Biology") > -1
                                }
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
                                checked={
                                  details.subjects.indexOf("English") > -1
                                }
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
                                checked={details.subjects.indexOf("ICT") > -1}
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
                                checked={
                                  details.subjects.indexOf("Physics") > -1
                                }
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
                                checked={details.subjects.indexOf("GIT") > -1}
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
              spacing={35}
              direction="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "100px",
                  marginLeft: "10vh",
                  backgroundColor: "#9C27B0",
                  "&:hover": {
                    backgroundColor: "#7A1E8A",
                  },
                }}
                onClick={clear}
              >
                Clear
              </Button>

              {/* <Button
                variant="contained"
                sx={{ width: "100px", marginLeft: "10vh" }}
                onClick={() => {
                  console.log(details.subjects);
                }}
              >
                Test
              </Button> */}

              <Button
                variant="contained"
                onClick={() => {
                  handleUpdate();
                }}
                sx={{
                  backgroundColor: "#9C27B0",
                  "&:hover": {
                    backgroundColor: "#7A1E8A",
                  },
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>
        </Box>
        {/**=================================================================================================== */}
      </div>
    </Box>
  );
};

export default EditUser;
