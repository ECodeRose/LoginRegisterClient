import React, { useEffect, useState } from "react";
import "./Login.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// imported icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

// Import assets
import video from "../../LoginAssets/bookVid.mp4";
import logo from "../../LoginAssets/logo.png";

const Login = () => {
  // Usestate Hook to store inputs
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();
  const [error, setError] = useState("");

  // Show message to user
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  // OnClick lets us get user input
  const loginUser = (e) => {
    // prevent submit
    e.preventDefault();
    // require Axios to create and API that connects to the server
    Axios.post("http://localhost:3002/login", {
      // create variable to send to the server through the route
      username: loginUserName,
      password: loginPassword,
    })
      .then((response) => {
        console.log(response);
        const expiresIn = new Date(Date.now() + 24 * 3600 * 1000); // 1 day from now
        const token = response.data.token;
        const cookieValue = `token=${token}; expires=${expiresIn.toUTCString()}; path=/; HttpOnly; SameSite=Strict`;

        console.log(cookieValue); // Check if the cookie string looks correct

        document.cookie = cookieValue;

        navigateTo("/dashboard"); // If the credentials match, navigate to the dashboard
      })
      .catch((error) => {
        // Handle error response from server
        if (error.response && error.response.data.error) {
          setError(error.response.data.error); // Set the error message state
        } else {
          console.error("Error:", error);
          setError("An error occurred. Please try again later.");
        }
      });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("showMessage"); // Show message
      setTimeout(() => {
        setStatusHolder("message"); //Hide it after 4s
      }, 4000);
    }
  }, [loginStatus]);

  // Clear the form on submit
  const onSubmit = () => {
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">A book For Every Occasion</h2>
            <p>Read at your convenience!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don&apos;t have an account?</span>
            <Link to={"/register"}>
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            {error && (
              <div className="error-box">
                <p className="error-message">{error}</p>
              </div>
            )}{" "}
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
