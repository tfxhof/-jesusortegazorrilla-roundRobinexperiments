import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';

export function AddPersonalInfo() {

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [dutyManagerName, setDutyManagerName] = useState('')

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);


  let navigate = useNavigate();


  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  url = url.concat("/measures");

  async function handleClick() {
    const researchCenter = {
      name,
      contactInfo: {
        country,
        city,
        address,
        dutyManagerName
      }
    }


    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(researchCenter)
    })

    if (response.ok) {
      console.log("ResearchCenter Added ");
      navigate('/ParticipantOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot modify Participant");
    }
  }

  return (
    <Fragment>
      <div class="page-titles">
        Add Personal Info
      </div>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField id="outlined-basic" label="City" variant="outlined" fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <TextField id="outlined-basic" label="Country" variant="outlined" fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <TextField id="outlined-basic" label="Duty Manager Name" variant="outlined" fullWidth
          value={dutyManagerName}
          onChange={(e) => setDutyManagerName(e.target.value)}
        />

      </Box>

      <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
        Submit
      </Button>


    </Fragment>
  )
}

export default AddPersonalInfo;
