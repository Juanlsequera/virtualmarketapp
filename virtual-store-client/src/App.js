import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Login from "./pages/Login";
import DataManagement from "./pages/DataManagement";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {
  ToastContainer
} from "react-toastify";
import Header from "./components/Header";
import {
  useSelector
} from "react-redux";
import Cart from "./pages/Cart";

const App = () => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.token != null;

  const admin = user.role === "admin";

  return ( <
    div className = "appContainer" >
    <
    ToastContainer / >
    <
    Router >
    <
    Header auth = {
      isAuthenticated
    }
    isAdmin = {
      admin
    }
    /> <
    Routes >
    <
    Route path = "/login"
    element = {
      <
      Login / >
    }
    /> <
    Route path = "/signup"
    element = {
      <
      Signup / >
    }
    /> <
    Route exact path = "/"
    element = {
      <
      PrivateRoute
      auth = {
        isAuthenticated
      }
      comp = {
        <
        Home / >
      } >
      <
      /PrivateRoute>
    }
    /> <
    Route exact path = "/cart"
    element = {
      <
      PrivateRoute
      auth = {
        isAuthenticated
      }
      comp = {
        <
        Cart / >
      } >
      <
      /PrivateRoute>
    }
    /> <
    Route exact path = "/management"
    element = {
      <
      AdminRoute
      isAdmin = {
        admin
      }
      comp = {
        <
        DataManagement / >
      } >
      <
      /AdminRoute>
    }
    /> < /
    Routes > <
    /Router> < /
    div >
  );
};

export default App;