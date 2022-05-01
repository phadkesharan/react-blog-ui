import "./register.css"
import { useState } from "react"
import axios from "axios";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username: username,
        email: email,
        password: password
      })
      console.log(res);
      res.data && window.location.replace('/login');
    }
    catch (err) {
      setError(true);
      console.log(err);
    }

  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput"
          type="text"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput"
          type="password"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">Login</button>
      {error && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>}
    </div>
  )
}
