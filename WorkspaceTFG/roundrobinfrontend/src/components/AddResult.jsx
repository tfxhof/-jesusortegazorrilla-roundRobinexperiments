import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
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

  // This is to handle the successful checkbox
  const initialValues = {
    satisfactory: 'yes',
  }
  const [values, setValues] = useState(initialValues);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }


  //To handle the file upload
  //const [pdfFile, setPdfFile] = useState(null);
  const { register, handleSubmit } = useForm();
  let url = "http://localhost:8080/experiments/";
  url = url.concat(String(expName));
  url = url.concat("/measures/Dureza/measurements/Madrid Dureza/results");
  //url = url.concat(String(expName));


  async function onSubmit(data) {
    console.log(data);
    console.log(url);

    // const storageRef = app.storage().ref();
    // const fileRef = storageRef.child(data.file[0]);
    const result = {
      name,
      comments,
      successful: values.satisfactory,
      file: data.file[0] //Dont know if this is correct
    }
    console.log(result.successful);

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    })

    if (response.ok) {
      console.log("Result Added");
      navigate('/ParticipantOverview');
    } else {
      console.log(result.file);
      console.log("Cannot add Result");
    }

  }

  return (

    <Fragment>
      <div class="page-titles">
        Add result to '{expName}'
      </div>

      {/* Call this method automatically when button is clicked */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">


          <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <TextField id="outlined-basic" label="Comments" variant="outlined" fullWidth
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />


          {/* Field to check if the measurement was successful */}
          <FormControl>
            <div id="form-successful">
              <FormLabel id="demo-row-radio-buttons-group-label">Was the measurement successful?</FormLabel>
            </div>
            <RadioGroup row
              name="satisfactory"
              value={values.satisfactory}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>


          {/* Field to upload result file */}
          <FormControl>
            <div id="form-file">
              <FormLabel id="demo-row-radio-buttons-group-label">Result file:</FormLabel>
            </div>
            <input type="file" name="fileResult" {...register('file')} />

          </FormControl>


        </Box>

        <button
          variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }}
        >
          Submit
        </button>

      </form>

    </Fragment>


  )
}

export default AddResult;
