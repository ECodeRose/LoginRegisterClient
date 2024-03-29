import React, { useState } from "react";
import "./Register.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

// Import assets
import video from "../../LoginAssets/bookVid.mp4";
import logo from "../../LoginAssets/logo.png";

// imported icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

const Register = () => {
  // useState to hold inputs
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // State to hold the error message
  const navigateTo = useNavigate();

  // OnClick lets us get user input
  const createUser = (e) => {
    e.preventDefault();
    // require Axios to create and API that connects to the server
    Axios.post("http://localhost:3002/register", {
      // create variable to send to the server through the route
      email: email,
      username: userName,
      password: password,
    })
      .then(() => {
        // On register redirect user to login page
        navigateTo("/");

        // Clear fields
        setEmail("");
        setUserName("");
        setPassword("");
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

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">A book For Every Occasion</h2>
            <p>Read at your convenience!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={"/"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>A bit About Yourself</h3>
          </div>

          <form action="" className="form grid">
            {error && (
              <div className="error-box">
                <p className="error-message">{error}</p>
              </div>
            )}{" "}
            {/* Display error box if error state is not empty */}
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setUserName(event.target.value);
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
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Register</span>
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

export default Register;
