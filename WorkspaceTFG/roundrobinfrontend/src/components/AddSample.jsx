import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';

export function AddSample() {
  const [material, setMaterial] = useState('');
  const [composition, setComposition] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);

  let navigate = useNavigate();

  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  url = url.concat("/samples");

  async function handleClick() {
    const sample = {
      material,
      composition,
      code,
      description
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sample)
    });
    // .then((result) => {
    //     console.log(email);
    //     setCenterEmail(email);
    //     console.log("Correo del centro: ");
    //     console.log(centerEmail);
    // })
    if (response.ok) {
      console.log("Sample Added " + centerEmail);
      navigate('/ExperimentOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot add Sample");
    }
  }

  return (
    <Fragment>
      <div class="page-titles">
        Add Sample to '{expName}'
      </div>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Material" variant="outlined" fullWidth
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <TextField id="outlined-basic" label="Composition" variant="outlined" fullWidth
          value={composition}
          onChange={(e) => setComposition(e.target.value)}
        />
        <TextField id="outlined-basic" label="Code" variant="outlined" fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </Box>


      <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={handleClick} >
        Submit
      </Button>


    </Fragment>
  )
}

export default AddSample;
