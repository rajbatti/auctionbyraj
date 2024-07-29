import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AccountSettings = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  useEffect(()=>{
    const config={headers:{'key-token':localStorage.getItem('key-token')}}
     axios.post('http://localhost:4000/account',{},config)
     .then((data=>{
      console.log(data)
      setUsername(data.data.message)
     }))
},[])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const config={headers:{'key-token':localStorage.getItem('key-token')}}
    axios.post('http://localhost:4000/account',{username:username,password:oldPassword,newpassword:newPassword},config)
     .then((data)=>{
      alert(data.data.message)
     })
     .catch((err)=>{
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
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountSettings;
