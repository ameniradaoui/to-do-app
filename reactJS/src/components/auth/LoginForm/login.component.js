import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../../auth/auth.css";
import logo from "../../../images/logo.png";
import authService from "../../../services/auth.service"
import alertHandler from "../../../lib/alertHandler"
function redirect(){
  window.location = '/#/dashboard';
}
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(
      email,
      password
    ).then(
      response => {
       
        if (response.status=200){
          alertHandler.success("successfully logged in" , redirect)    
        }else{
          alertHandler.failed("wrong email or password , verify your information!")
        }
    
      },
      error => {
        alertHandler.failed("wrong email or password , verify your information!")
      }
    );
  
    
  };



  return (
    <div className="signupForm">
      <Form onSubmit={handleLogin}>
        <img className="logo" src={logo} alt="" />

        <h1>Welcome </h1>
        <h5> Sign in to your account</h5>

        <div className="form-group mt-5">
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
          <button className="btn btn-primary btn-block">SIGN IN</button>
          <CheckButton style={{ display: "none" }} />
        </div>

        <div>
          <a href="#/register">
            {" "}
            <h5>Create an account</h5>{" "}
          </a>
        </div>
      </Form>
    </div>
  );
}
