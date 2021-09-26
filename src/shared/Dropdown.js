import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = (props) => {
  const Data = props.data;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 150, backgroundColor: "white" }}>
        <InputLabel id="demo-simple-select-label" sx={{ fontWeight: "bold" }}>
          {props.InputLabel}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          //   label={props.label}
          onChange={props.Dropdownselected}
        >
          {Data.map((item, index) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
