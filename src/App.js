import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
//import Footer from "./shared/Footer";
import Timetable from "./dashboard/Timetable";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Timetable />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default App;
