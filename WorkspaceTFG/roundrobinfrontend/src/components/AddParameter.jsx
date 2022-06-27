import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@material-ui/core';
import { ExpContext } from '../providers/ExperimentContext';

export function AddParameter() {

  const [magnitude, setMagnitude] = useState('');
  const [value, setValue] = useState('');

  const { measurementName } = useContext(ExpContext);


  let navigate = useNavigate();


  async function handleClick() {

    let url = "http://localhost:8080/measurements/";
    url = url.concat(String(measurementName));
    url = url.concat("/parameters");
    
    const parameter = {
      magnitude,
      value,
    }

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameter)
    })

    if (response.ok) {
      console.log("Parameter Added");
      navigate('/ParticipantMeasurementOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot add Parameter");
    }
  }

  return (
    <Fragment>
      <div class="page-titles">
        Add Instrument to '{measurementName}'
      </div>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Magnitude" variant="outlined" fullWidth
          value={magnitude}
          onChange={(e) => setMagnitude(e.target.value)}
        />
        <TextField id="outlined-basic" label="Value" variant="outlined" fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      </Box>

      <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
        Submit
      </Button>


    </Fragment>
  )
}

export default AddParameter;
