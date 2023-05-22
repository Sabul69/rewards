import { useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";

const Layout = ({ isLoggedIn, setCheck }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCheck((prev) => !prev);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="wrapper ">
      <header>
        <ol className="head">
          <Link style={{ textDecoration: "none", color: "#fff" }} to={"/"}>
            <li className="list">Home</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to={"/Manage"}
          >
            <li className="list">Manage Rewards</li>
          </Link>
          <div
            style={{ color: "#fff" }}
            onClick={() => {
              handleLogout();
            }}
          >
            <li className="list">LogOut</li>
          </div>
        </ol>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
