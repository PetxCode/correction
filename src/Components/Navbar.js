import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./AuthState/GlobalContext";
import SignUp from "./SignUp";

function Navbar() {
  const { currentUser, current } = useContext(GlobalContext);
  return (
    <div
      style={{ height: "70px", width: "100%", backgroundColor: "lightcoral" }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-around",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <div>Home</div>
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to="/post">
          <div>Post</div>
        </Link>
        <SignUp />
      </div>
    </div>
  );
}

export default Navbar;
