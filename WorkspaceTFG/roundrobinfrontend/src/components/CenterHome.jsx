import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router';
import { CenterContext } from '../providers/CenterContext';
import { Paper } from '@material-ui/core';
import Button from '@mui/material/Button';
import { ExperimentList } from "./ExperimentList";
import { ExperimentListParticipant } from "./ExperimentListParticipant";


function CenterHome() {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto"};
    const [creatorExperiments, setCreatorExperiments] = useState([]);
    const [participantExperiments, setParticipantExperiments] = useState([]);
    const [searchedResearchCenter, setSearchedResearchCenter] = useState('');

    const { centerEmail, setCenterEmail } = useContext(CenterContext);

    let navigate = useNavigate();


    //To get the research center's name
    useEffect(() => {
        let url = "http://localhost:8080/centers/";
        url = url.concat(String(centerEmail));
        // fetch("http://localhost:8080/centers/{email}")
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setSearchedResearchCenter(result);
            }
            )
    }, [])


    
    //To get the research centers where is the CREATOR
    useEffect(() => {
        let url = "http://localhost:8080/centers/";
        url = url.concat(String(centerEmail));
        url = url.concat("/experiments");
        url = url.concat("?creator=true");
        // fetch("http://localhost:8080/centers/{id}/experiments?creator=true")
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setCreatorExperiments(result);
            }
            )
    }, [])



    //To get the research centers where it PARTICIPATES
    useEffect(() => {
        let url = "http://localhost:8080/centers/";
        url = url.concat(String(centerEmail));
        url = url.concat("/experiments");
        url = url.concat("?creator=false");
        // fetch("http://localhost:8080/centers/{id}/experiments?creator=false")
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setParticipantExperiments(result);
            }
            )
    }, [])

    function createExp() {
        navigate("/CreateExperiment");
    }

    return (

        <Fragment>

            <div class="page-titles">
                '{searchedResearchCenter.name}' Research Center
            </div>

            <div id="createExperimentButton">
                <Button variant="contained" className="buttons" style={{ backgroundColor: "#4488f0", color: "white", margin: "auto" }} onClick={createExp} >
                    Create Experiment
                </Button>
            </div>
            <div>
                {centerEmail}
            </div>
            <div>
                Session storage: {localStorage.getItem("email")};
            </div>




            <div className="centerHome">
                <div class="container">
                    <div class="row my-4 columns">
                        <div class="col-lg-6">
                            <div className="column-title-centered">
                                {/* <h3 class="font-weight-light">EXPERIMENTS AS CREATOR</h3> */}
                                <b>Experiments as Creator</b>
                            </div>
                            {/* Shows each experiment */}
                            <Paper elevation={3} style={paperStyle}>
                                <ExperimentList experiments={creatorExperiments} />
                            </Paper>
                        </div>

                        <div class="col-lg-6">
                            <div className="column-title-centered">
                                {/* <h3 class="font-weight-light">EXPERIMENTS AS PARTICIPANT</h3> */}
                                <b>Experiments as Participant</b>
                            </div>
                            <Paper elevation={3} style={paperStyle}>

                                <ExperimentListParticipant experiments={participantExperiments} />

                            </Paper>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    );
}

export default CenterHome;