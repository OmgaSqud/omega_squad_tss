import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./shared/Footer";

import Timetable from "./dashboard/Timetable";
import Homepage from "./home/Homepage";
import Navbar from "./shared/Navbar";
import StudentView from "./student/StudentView";
import AddUser from "./admin/AddUser";

import EditUser from "./admin/EditUser";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/dashboard">
          <Timetable />
        </Route>
        <Route exact path="/student-view">
          <StudentView />
        </Route>
        <Route exact path="/add-user">
          <AddUser />
        </Route>
        <Route exact path="/edit-user">
          <EditUser />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
