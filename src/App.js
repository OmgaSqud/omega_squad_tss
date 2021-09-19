import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
//import Footer from "./shared/Footer";
import Timetable from "./dashboard/Timetable";
import Navbar from "./shared/Navbar";
import StudentView from "./student/StudentView";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
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
