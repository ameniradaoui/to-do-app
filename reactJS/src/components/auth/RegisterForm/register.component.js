import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "../../auth/auth.css";
import logo from "../../../images/logo.png";
import authService from "../../../services/auth.service"
import alertHandler from "../../../lib/alertHandler"
function redirect(){
  window.location = '/#/login';
}
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const createUser = (event) => {
    event.preventDefault();
    if (email === "" || password === ""|| fullname === "" ) {
      alertHandler.failed("All Fields are required!");
      return;
    }
      
    authService.register(
      fullname,
      email,
      password
    ).then(
      response => {
      
        alertHandler.success("you have successfully created your account" , redirect)
     
        
      },
      error => {
        alertHandler.failed("email already exist , please try another one!")
      }
    );
  
    
  };

  return (
    <div className="signupForm">
      <Form>
        <img className="logo" src={logo} alt="" />
        <div>
          <h1> WELCOME !</h1>
          <h5> Register your account </h5>
        </div>

        <div className="form-group mt-5">
          <Input
            type="text"
            className="form-control"
            placeholder="FullName"
            name="FullName"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            className="form-control"
            placeholder="Email"
            name="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <Input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={createUser} >SIGN UP</button>
         
        </div>

        

        <h5>
          Already have an account? <a href="#/login">SIGN IN</a>
        </h5>
      </Form>
    </div>
  );
}
