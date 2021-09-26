import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SubjectCard = (props) => {
  return (
    <Card
      sx={{
        width: 200,
        height: 100,
        marginTop: 5,
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: props.bgcolor,
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 18, textAlign: "center" }}
          color="black"
          gutterBottom
        >
          {props.subject}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" size="small" sx={{ color: "white" }}>
          Drag
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubjectCard;
