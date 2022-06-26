import React, { Fragment, useState, useContext } from "react";
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import { Paper } from '@material-ui/core';
import { Box, Button } from '@mui/material';
import { CenterContext } from '../providers/CenterContext';

export function Home() {
  const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }
  const [email, setEmail] = useState('')

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { setCenterName } = useContext(CenterContext);

  let navigate = useNavigate();

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

  //To log in
  async function logIn() {
    let response = await checkCenterExists();
    console.log(response);
    if (response === true) {
      setCenterEmail(email);
      console.log(centerEmail)
      navigate('/CenterHome');
    } else {
      console.log("No existe ese centro");
    }
  }

  async function checkCenterExists() {
    if (email === "") {
      return false;
    }
    setCenterEmail(email);
    let url = "http://localhost:8080/centers/";
    url = url.concat(email);
    // fetch("http://localhost:8080/centers/{id}/experiments?creator=true")
    let response = await fetch(url)

    //let creatorEmail;
    if (response.ok) { // if HTTP-status is 200-299
      let json = await response.json();
      setCenterName(json.name);
      // get the response body
      // creatorEmail = await response.json();
      // creatorEmail = creatorEmail.email;
      return true;

    } else { //If the given center is not registered
      return false;
    }
  }

  //To sign up
  function signUp() {
    navigate('/SignUp');
  }

  return (
    <Fragment>
      <form>
        <div className="centerHome">
          <div class="container">
            <div class="row align-items-center my-5">
              <Paper elevation={3} style={paperStyle}>
                <div class="page-titles">
                  <h1 class="font-weight-light">Log in</h1>
                </div>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">

                  <TextField required id="outlined-basic" label="Email" variant="outlined" fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </Box>

                <div>
                  <Button variant="contained" color="success" className="buttons" style={{ marginTop: "20px" }} onClick={logIn} >Log In</Button>
                </div>

                <div id="sign-up-button">
                  <Button variant="contained" className="buttons" style={{ backgroundColor: "blue", margin: "auto" }} onClick={signUp}>Sign Up</Button>
                </div>

              </Paper>
            </div>
          </div>
        </div>
      </form>
     
    </Fragment >
  );
}

export default Home;