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


import UploadFiles from "./UploadFiles";
import UploadService from "../services/UploadFilesService";
import { AlignHorizontalLeft } from '@mui/icons-material';



export function AddResult() {

  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [sampleCode, setSampleCode] = useState('');

  //For file uploading
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);


  const { centerEmail, setCenterEmail } = useContext(CenterContext);
  const { expName, setExpName } = useContext(ExpContext);
  const { measurementName, setMeasurementName } = useContext(ExpContext);

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
  //url = url.concat(String(expName));


  async function onSubmit(id) {
    let url = "http://localhost:8080/measurements/";
    url = url.concat(String(measurementName));
    url = url.concat("/results");
    console.log("id:");
    console.log(id);
    console.log(url);

    // const storageRef = app.storage().ref();
    // const fileRef = storageRef.child(data.file[0]);
    const result = {
      name,
      comments,
      successful: values.satisfactory,
      fileId: id,
      //fileString: String(data.file[0]), //Dont know if this is correct
    }

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    })

    if (response.ok) {
      console.log("Result Added");
      navigate("/ParticipantMeasurementOverview")
    } else {
      console.log(result.file);
      console.log("Cannot add Result");
    }

  }

  function onChange(e) {
    let files = e.target.files;
    console.warm("data file: ", files);
  }

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  /**
   * To upload ONLY FILE(BLOB) & NAME to Database
   */
  async function upload() {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    //Keep only the extension, no matter if there are more dots in the file name
    let extension = currentFile.name.split('.').pop();
    if(!(extension === "csv" || extension === "xlsx" || extension === "xls")) {
      return;
    }

    // let response = await fetch("http://localhost:8080/measurements/a/results/files", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: formData
    // });

    let response = await UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })

    console.log("Response de vuelta");
    console.log(response);
    await onSubmit(response);
      if (response.ok) {
        console.log("Respuesta del post:")
        console.log(response)
        onSubmit(response);  
      }
    setSelectedFiles(undefined);
  };





  return (

    <Fragment>
      <div class="page-titles">
        Add result to '{measurementName}'
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


          {/* Field to upload result file
          <FormControl>
            <div id="form-file">
              <FormLabel id="demo-row-radio-buttons-group-label">Result file:</FormLabel>
            </div>
            <input type="file" name="fileResult" {...register('file')} />
            {/* <input type="file" name="fileResult" onChange={(e) => this.onChange(e)} />

          </FormControl> */}


        </Box>

        {/* <button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} >
          Submit
        </button> */}

      </form>



      {/* To upload the file */}
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {/* Input to upload the file */}
        <label className="btn btn-default">
          <input type="file" onChange={selectFile} />
        </label>

        {/* Button to add the result file to Database */}
        {/* <button className="btn btn-success" disabled={!selectedFiles} onClick={upload} > */}
        <button className="btn btn-success" onClick={upload} >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        {/* <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div> */}
      </div>



    </Fragment>


  )
}

export default AddResult;
