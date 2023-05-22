import "./App.css";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import Manage from "./pages/Manage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [check, setCheck] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setIsLog(false);
    } else setIsLog(true);
  }, [check]);
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login isLoggedIn={isLog} setCheck={setCheck} />}
      />
      <Route
        path="/"
        element={<Layout isLoggedIn={isLog} setCheck={setCheck} />}
      >
        <Route index element={<Rewards />} />
        <Route path="/manage" element={<Manage />} />
      </Route>
      <Route path="*" element={<h1 className="wrapper">Not Found</h1>} />
    </Routes>
  );
}

export default App;
