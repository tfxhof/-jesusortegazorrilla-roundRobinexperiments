import React, { Fragment, useState, useEffect, useContext } from "react";
import { CenterContext } from '../providers/CenterContext';
import { Paper } from '@material-ui/core';
import Button from '@mui/material/Button';
import { ExperimentList } from "./ExperimentList";
//import { AppContext } from '../providers/ExperimentContext';
import { NavLink } from "react-router-dom";


function CenterHome() {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto" };
    const [creatorExperiments, setCreatorExperiments] = useState([]);
    const [participantExperiments, setParticipantExperiments] = useState([]);

    const { centerEmail } = useContext(CenterContext);

    let url = "http://localhost:8080/centers/";
    url = url.concat(String(centerEmail));
    url = url.concat("/experiments");
    console.log(url);


    //To get the research centers
    useEffect(() => {
        let url1 = url.concat("?creator=true");
        // fetch("http://localhost:8080/centers/{id}/experiments?creator=true")
        fetch(url1)
            .then(res => res.json())
            .then((result) => {
                setCreatorExperiments(result);
                console.log(result);
            }
            )
    }, [])



    //To get the research centers
    useEffect(() => {
        let url2 = url.concat("?creator=false");
        // fetch("http://localhost:8080/centers/{id}/experiments?creator=false")
        fetch(url2)
            .then(res => res.json())
            .then((result) => {
                setParticipantExperiments(result);
                console.log("Participante");
                console.log(result);
            }
            )
    }, [])

    return (

        <Fragment>

            <div id="createExperimentButton">
                <NavLink className="nav-link" to="/CreateExperiment">
                    <Button variant="contained" className="buttons" style={{ backgroundColor: "blue", color: "white", margin: "auto" }} >Create Experiment</Button>
                </NavLink>
            </div>
            <div>
                {centerEmail}
            </div>



            <div className="centerHome">
                <div class="container">
                    <div class="row align-items-center my-4">


                        <div class="col-lg-6">
                            <div className="title-experiment-overview">
                                <h3 class="font-weight-light">EXPERIMENTS AS CREATOR</h3>
                            </div>
                            <Paper elevation={3} style={paperStyle}>

                                <ExperimentList experiments={creatorExperiments} />

                            </Paper>
                        </div>

                        <div class="col-lg-6">
                            <div className="title-experiment-overview">
                                <h3 class="font-weight-light">EXPERIMENTS AS PARTICIPANT</h3>
                            </div>
                            <Paper elevation={3} style={paperStyle}>

                                <ExperimentList experiments={participantExperiments} />

                            </Paper>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    );
}

export default CenterHome;