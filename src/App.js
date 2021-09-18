import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        {/* <Route exact path="/">
          <Homepage />
        </Route> */}
      </Switch>
    </>
  );
};

export default App;
