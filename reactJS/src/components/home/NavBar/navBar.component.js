import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar,  Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import "./Navbar.css";
import authService from "../../../services/auth.service"
export default function NavBar() {

  useEffect(() => {
    checkUserExit()

  },[]);

  const logout=()=>{
    authService.logout();
  }
  const checkUserExit=()=>{
    authService.getCurrentUser();
   
  }
  return (
    <div className="NavBar">
      <div className="row">
        <div className="col-md-12">
          <Router>
            <Navbar
              className="customNavbar"
              variant="dark"
              expand="lg"
              sticky="top"
              style={{ background: "#303a52" }}
            >
              <Button variant="outline-success" className="customButton" onClick={logout}>
                LogOut
              </Button>
           
            </Navbar>
          </Router>
        </div>
      </div>
    </div>
  );
}
