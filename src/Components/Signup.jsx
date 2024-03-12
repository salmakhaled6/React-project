import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate =useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

  
    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

   
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      
      axios
        .post("http://localhost:3000/auth/signup", { name, email, password })
        .then((response) => {
          if(response.data.status){
         navigate("/login")
        } 
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    } else {
  
      setErrors(errors);
    }
  };

  const isValidEmail = (email) => {
  
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="signuppage">
      <h2 className="signup">Sign up</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="name">
          <div className="username">
            
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input type="text" placeholder="Enter name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn">
            Register
          </button>
          <p className="para">Already have an account ?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
