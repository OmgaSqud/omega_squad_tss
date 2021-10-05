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

const UsersList = () => {
  const [type, settype] = React.useState("");

  const [cls, setcls] = React.useState("");

  const names = ["Manishyam", "Nimasha", "Vinura"];

  const handleChangeCls = (event) => {
    setcls(event.target.value);
  };

  const handleChangeType = (event) => {
    settype(event.target.value);
  };
  return (
    <Box
      sx={{ marginTop: "10vh", height: "85vh", width: "100vw", flexGrow: 1 }}
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
                Add User
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
                Edit User
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
            <Box sx={{ flexGrow: 1, padding: "20px 20px 0px 60px" }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box sx={{ minWidth: 120, margin: "0px auto" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handleChangeType}
                        sx={{ backgroundColor: "white" }}
                      >
                        <MenuItem value={"student"}>Student</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ minWidth: 120, margin: "0px auto" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Class
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cls}
                        label="cls"
                        onChange={handleChangeCls}
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
                    id="highlights-demo"
                    sx={{
                      width: 400,
                      margin: "-16px auto 0px",
                    }}
                    options={names}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search"
                        margin="normal"
                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      />
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = AutosuggestHighlightMatch(
                        option,
                        inputValue
                      );
                      const parts = AutosuggestHighlightParse(option, matches);

                      return (
                        <li {...props}>
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsersList;
