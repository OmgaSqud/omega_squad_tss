import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar";
import Homepage from "./home/Homepage";
import { Route } from "react-router";
import StudentView from "./student/StudentView";
import Timetable from "./dashboard/Timetable";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/student">
          <StudentView />
        </Route>
        <Route exact path="/dashboard">
          <Timetable />
        </Route>
      </Switch>
    </>
  );
};

export default App;
