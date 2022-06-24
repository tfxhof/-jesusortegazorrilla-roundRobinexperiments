import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import UploadService from "../services/UploadFilesService";


const UploadFiles = () => {

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  let navigate = useNavigate();

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  async function upload (){
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    
    let response = await UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        console.log("Subo la file 1")
      })
      .then((files) => {
        setFileInfos(files.data);
        console.log("Subo la file 2")
        navigate("/ParticipantMeasurementOverview")
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });
    setSelectedFiles(undefined);
  };



  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);



  return (
    <Fragment>
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


  );

};


export default UploadFiles;
