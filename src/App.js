import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
//import Footer from "./shared/Footer";
import Timetable from "./dashboard/Timetable";
import Navbar from "./shared/Navbar";

import Homepage from "./home/Homepage";
import { Route } from "react-router";
import StudentView from "./student/StudentView";
import Timetable from "./dashboard/Timetable";
import StudentView from "./student/StudentView";


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
    <Route exact path="/student-view">
          <StudentView />
        </Route>

      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default App;
