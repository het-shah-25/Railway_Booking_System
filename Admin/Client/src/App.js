import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from './Pages/DashBoard';
import ViewUsers from "./Pages/ViewUser"; // Corrected import
import ViewBookings from "./Pages/ViewBooking"
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/viewUsers" exact component={ViewUsers} />

        <Route path="/viewBookings" exact component={ViewBookings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
