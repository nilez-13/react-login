import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [isSecure, setIsSecure] = useState(true);

  const handleEmail = () => (event) => {
    setEmail(event.target.value);
  };

  const handlePassowrd = () => (event) => {
    setPassword(event.target.value);
  };

  const handleIsSecure = () => {
    setIsSecure(!isSecure);
  };

  async function Login(reqBody) {
    const history = useHistory();
    try {
      let res = await axios({
        method: "post",
        url: "https://api.marketplace.coveredpress.com/journalist/login",
        data: reqBody,
      });

      let data = res.data;
      sessionStorage.setItem("token", data);
      history.push("/success");
      return data;
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      setErrors(error.response.data.errors);
    }
  }

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    Login(data);
  };

  console.log(errors);

  return (
    <div className="centered">
      <label>Email:</label>
      <input
        className="inputbox"
        value={email}
        type="text"
        onChange={handleEmail()}
      />
      {errors && errors.email && errors.email[0] && (
        <span className="error-component"> {errors.email[0]} </span>
      )}
      <br />
      <label>Password:</label>
      <input
        className="inputbox"
        value={password}
        type={isSecure ? "password" : "text"}
        onChange={handlePassowrd()}
      />
      <span className="field-icon" onClick={handleIsSecure}>
        {isSecure ? <FaEyeSlash /> : <FaEye />}
      </span>
      {errors && errors.password && errors.password[0] && (
        <span className="error-component"> {errors.password[0]} </span>
      )}
      <br />

      <button className="button" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
