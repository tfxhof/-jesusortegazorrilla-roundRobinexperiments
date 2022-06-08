import React, { Fragment, useState } from "react";
import TextField from '@mui/material/TextField';
import { Paper } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Home() {
  const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }

  const [email, setEmail] = useState('')

  //To log in
  // const logInHandleClick = (e) => {
  //   //TODO: Verify that this center exists
  //   fetch("http://localhost:8080/centers", {
  //     //method: "POST",
  //     //headers: { "Content-Type": "application/json" },
  //     //body: JSON.stringify(researchCenter)
  //   }).then(() => {
  //     console.log("Research Center Added")
  //   })
  // }


  return (
    <Fragment>

      <div className="centerHome">
        <div class="container">
          <div class="row align-items-center my-5">
            <Paper elevation={3} style={paperStyle}>
              <h1 class="font-weight-light">Log in</h1>
              
              <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">
                
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              
              <NavLink className="nav-link" to="/CenterHome"> 
                <Button variant="contained" color="success" style={{marginTop: "20px", width: "100px"}} /*onClick={logInHandleClick}*/>Log In</Button>
              </NavLink>

              <NavLink className="nav-link" to="/SignUp">
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "auto" , width: "100px"}}>Sign Up</Button>
              </NavLink>

              <NavLink className="nav-link" to="/ExperimentOverView">
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "auto" , width: "100px"}}>Prueba context</Button>
              </NavLink>

            </Paper>
          </div>
        </div>
      </div>


    </Fragment >
  );
}

export default Home;