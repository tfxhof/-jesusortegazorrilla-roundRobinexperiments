import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';

export function AddTest() {

  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [sampleCode, setSampleCode] = useState('');

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);


  let navigate = useNavigate();


  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  url = url.concat("/measures");

  async function handleClick() {
    const measure = {
      name,
      instructions,
      sample: {
        code: sampleCode
      }
    }

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(measure)
    })
    // .then((result) => {
    //     console.log(email);
    //     setCenterEmail(email);
    //     console.log("Correo del centro: ");
    //     console.log(centerEmail);
    // })
    if (response.ok) {
      console.log("Measure Added ");
      navigate('/ExperimentOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot add Measure");
    }
  }

  return (
    <Fragment>
      <div class="page-titles">
        Add Measure to '{expName}'
      </div>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">


        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField id="outlined-basic" label="Instructions" variant="outlined" fullWidth
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <TextField id="outlined-basic" label="Sample Code" variant="outlined" fullWidth
          value={sampleCode}
          onChange={(e) => setSampleCode(e.target.value)}
        />

      </Box>

      <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
        Submit
      </Button>


    </Fragment>
  )
}

export default AddTest;
