import React, { useState } from "react";
import "../css/login.css"; // Import your CSS file here
import Navbar from "./Navbar";
import axios from "axios";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
    axios.post(' http://localhost:4000/login',formData)
    .then((data)=>{
      console.log(data.data)
      localStorage.setItem('key-token',data.data.key)
      alert(data.data.message)
      window.location.replace('/')
    }).catch((err)=>{
       console.log(err)
     
      if (err.response.data.message.message){
        setMessage(err.response.data.message.message)
      }
      else if(err.response.data.message){
        setMessage(err.response.data.message)
      }
    })
  };

  return (
    <>
  
      <div className="signup-container border rounded border-primary shadow-5">
        <h2 className="signup-title">Login</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-success  btn-lg">SUBMIT</button>
          <p>Not Have an Account <a href='/signup'>Click Here</a></p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default LoginForm;
