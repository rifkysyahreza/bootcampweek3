import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";

export const routePrivate = [
  {
    exact: true,
    path: "/profile",
    return: <Profile></Profile>,
  },
  {
    exact: true,
    path: "/",
    return: <Home></Home>,
  },
];

export const routePublic = [
  {
    exact: true,
    path: "/login",
    return: <Login></Login>,
  },
  {
    exact: true,
    path: "/register",
    return: <Register></Register>,
  },
];
