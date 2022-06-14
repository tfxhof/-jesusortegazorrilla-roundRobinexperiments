import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';

export function AddInstrument() {

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);


  let navigate = useNavigate();


  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  url = url.concat("/measures/");

  async function handleClick() {
    const instrument = {
      name,
      brand,
      model
    }

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(instrument)
    })

    if (response.ok) {
      console.log("Instrument Added ");
      navigate('/ExperimentOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot add Instrument");
    }
  }

  return (
    <Fragment>
      <div class="page-titles">
        Add Instructions to '{expName}'
      </div>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Brand" variant="outlined" fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <TextField id="outlined-basic" label="Model" variant="outlined" fullWidth
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />


      </Box>

      <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
        Submit
      </Button>


    </Fragment>
  )
}

export default AddInstrument;
