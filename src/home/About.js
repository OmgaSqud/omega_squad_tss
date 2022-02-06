import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
  return (
    <section id="hero">
      <div className="container">
        <Card
          sx={{
            width: 400,
            margin: "100px auto",
          }}
          align="center"
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              gutterBottom
              sx={{ textDecoration: "underline", marginBottom: "5%" }}
            >
              About
            </Typography>
            <Typography variant="body1" textAlign={"justify"}>
              VirtuaClass is a web application for online zoom class scheduling for
              teachers and personal timetable view for both teachers and
              students. Software was developed by{" "}
              {
                <i>
                  <b>Omega_Squad</b>
                </i>
              }
              .
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
