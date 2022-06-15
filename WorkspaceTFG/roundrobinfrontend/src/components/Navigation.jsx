import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button } from '@mui/material';
import { CenterContext } from '../providers/CenterContext';
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";


function Navigation() {

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { centerName, setCenterName } = useContext(CenterContext);


  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("email");
    setCenterEmail("");
  }

  function isLoggedIn() {
    if (centerEmail == null || centerEmail == "" || Object.keys(centerEmail).length === 0 || centerEmail == undefined) {
      return false;
    } else {
      return true;
    }
  }

  function titleClicked() {
    if (centerEmail === null) {
      navigate("/");
    } else {
      navigate("/CenterHome");
    }
  }

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-navigation app-bar" >
        <div className="container" >
          <Button className="navbar-brand" to="/" onClick={titleClicked} style={{ fontSize: "20px" }}>
            Round-Robin
          </Button>
          <div>
            <ul className="navbar-nav ml-auto">

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/SignUp">
                  Sign up
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> */}

              {/* To show or not the home button */}
              {isLoggedIn() ? <li className="nav-item">
                <NavLink className="nav-link" to="/CenterHome" style={{ fontSize: "20px", paddingLeft: "15px" }}>
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> : ""}


              {/* To show or not the logout button */}
              {isLoggedIn() ? <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logOut} style={{ fontSize: "20px", paddingLeft: "30px" }}>
                  Log out
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> : ""}


            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;