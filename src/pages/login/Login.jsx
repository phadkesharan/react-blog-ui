import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

import "./login.css";

export default function Login() {

  const userRef = useRef('');
  const passwordRef = useRef('');

  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Shit");
    
    dispatch({ type: "LOGIN_START" });

    try {

      const res = await axios.post('/auth/login/', {
        username: userRef.current.value,
        password: passwordRef.current.value
      })

      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    }
    catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }

    console.log(isFetching);
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput"
          type="text"
          ref={userRef}
          placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password..." />
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}
