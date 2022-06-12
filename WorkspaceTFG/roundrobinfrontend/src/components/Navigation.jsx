import React, { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button } from '@mui/material';
import { CenterContext } from '../providers/CenterContext';


function Navigation() {

  const { centerEmail, setCenterEmail } = useContext(CenterContext);

  let navigate = useNavigate();

  function logOut() {
    setCenterEmail = "";
  }

  function isLoggedIn(){
    if (centerEmail == null){
      return false;
    } else {
      return true;
    }
  }

  function titleClicked(){
    if (centerEmail === null){
      navigate("/");
      console.log(centerEmail);
    } else {
      navigate("/CenterHome");
    }
  }

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-navigation" >
        <div className="container" >
          <Button className="navbar-brand" to="/" onClick={titleClicked}>
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

              {isLoggedIn() ? <li className="nav-item">
                <NavLink className="nav-link" to="/CenterHome">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> : "" }

              {isLoggedIn() ? <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logOut}>
                  Log out
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li> : "" }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;