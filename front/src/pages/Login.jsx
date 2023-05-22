import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = ({ isLoggedIn, setCheck }) => {
  const [log, setLog] = useState(null);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleFill = (e, atribute) => {
    setCredentials((prev) => {
      return { ...prev, [atribute]: e };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      "https://254ek2g4ijh2oukmrysa2e4gju0blomb.lambda-url.us-east-1.on.aws/";
    const rawResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const content = await rawResponse.json();
    if (content.accessToken) {
      localStorage.setItem("user", JSON.stringify(content));
      setLog(true);
      setCheck((prev) => !prev);
    }
    console.log(content);
    if (!content.accessToken) {
      setLog(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="wrapper log">
      <form className="login" onSubmit={handleSubmit}>
        <p className="title">Log in</p>
        {log === false && <p className="invalid">Invalid Credentials</p>}
        <input
          type="text"
          placeholder="E-mail"
          required
          onChange={(e) => {
            handleFill(e.target.value, "email");
          }}
          autoFocus
        />
        <i className="fa fa-user"></i>
        <input
          required
          type="password"
          placeholder="Password"
          onChange={(e) => {
            handleFill(e.target.value, "password");
          }}
        />
        <i className="fa fa-key"></i>
        <button>
          <i className="spinner"></i>
          <span className="state">Log in</span>
        </button>
      </form>
      <footer>
        <p>@2023</p>
      </footer>
    </div>
  );
};

export default Login;
