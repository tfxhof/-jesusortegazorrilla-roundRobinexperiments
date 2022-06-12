import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';



export function AddResult() {

  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [sampleCode, setSampleCode] = useState('');

  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);


  let navigate = useNavigate();


  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  //Have to think about this in the backend
  url = url.concat("/measures/Dureza/measurements/Madrid Dureza/results");
  //url = url.concat(String(expName));

  async function handleClick() {
    const result = {
      name,
      comments
    }

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    })

    if (response.ok) {
      console.log("Result Added ");
      navigate('/ParticipantOverview');
    } else {
      // TODO: advertise that there is already a center with given email or name
      console.log("Cannot add Result");
    }
  }

  return (
    <Fragment>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div class="page-titles">
          Add result to '{expName}'
        </div>

        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

          <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField id="outlined-basic" label="Comments" variant="outlined" fullWidth
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          {/* <Checkbox {...label} defaultChecked />
        <Checkbox {...label} /> */}

          {/* Field to check if the measurement was successful */}
          <FormControl>
            <div id="form-successful">
              <FormLabel id="demo-row-radio-buttons-group-label">Was the measurement Successful?</FormLabel>
            </div>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>


          <input type="file" name="file" />
          <button>Submit</button>


          <TextField id="outlined-basic" label="Add file" variant="outlined" fullWidth
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
          />

        </Box>

        <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
          Submit
        </Button>

      </form>
    
    </Fragment>
  )
}

export default AddResult;
