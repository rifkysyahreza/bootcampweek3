import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Navbar() {
  return (
    <div>
      <nav className="w-full flex flex-row justify-between items-center px-20">
        <h1 className="text-3xl font-bold">Logo</h1>
        <div className="menu flex flex-row items-center justify-center gap-5">
          <Link to={"/"}>
            <h1>Home</h1>
          </Link>
          <Link to={"/login"}>
            <h1>Login</h1>
          </Link>
          <Link to={"/register"}>
            <h1>Register</h1>
          </Link>
          <Link to={"/profile"}>
            <h1>Profile</h1>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
