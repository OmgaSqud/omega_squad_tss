import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const SubjectCard = (props) => {
  return (
    <Card
      sx={{
        width: 175,
        height: 50,
        marginTop: 5,
        borderRadius: 2,
        backgroundColor: props.bgcolor,
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography fontSize={18} color="black" fontFamily="cursive">
          {props.subject}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
