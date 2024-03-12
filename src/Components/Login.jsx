
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3000/auth/login", { email, password })
        .then((response) => {
          if(response.data.status){
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email); 
            setIsLoggedIn(true); 
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="login">
      <h2>LogIn</h2>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <div>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
   
          {isLoggedIn && <Link to="/home">Home</Link>}
        </div>
      </form>
    </div>
  );
}

export default Login;
