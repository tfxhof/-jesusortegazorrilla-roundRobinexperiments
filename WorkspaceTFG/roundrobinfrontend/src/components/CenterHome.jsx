import React, { Fragment, useState, useEffect } from "react";
import { Paper } from '@material-ui/core';
import Button from '@mui/material/Button';
import { ExperimentList } from "./ExperimentList";

function CenterHome({ id }) {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto" };
    const [creatorExperiments, setCreatorExperiments] = useState([]);
    const [participantExperiments, setParticipantExperiments] = useState([]);

    // //To add a new research center
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     //const contactInfo = { country: country, city: city, address: address, dutyManagerName: dutyManagerName };
    //     //create the research center with the info of it
    //     //const researchCenter = { name: name, country: country, city: city, address: address, dutyManagerName: dutyManagerName }
    //     fetch("http://localhost:8080/centers", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         //body: JSON.stringify(researchCenter)
    //     }).then(() => {
    //         console.log("Research Center Added")
    //     })
    // }


    //To get the research centers
    useEffect(() => {
        // fetch("http://localhost:8080/centers/"+ {id} + "/experiments?creator=true")
        fetch("http://localhost:8080/centers/1/experiments?creator=true")
            .then(res => res.json())
            .then((result) => {
                setCreatorExperiments(result);
                console.log(result);
            }
            )
    }, [])

    //To get the research centers
    useEffect(() => {
        // fetch("http://localhost:8080/centers/"+ {id} + "/experiments?creator=false")
        fetch("http://localhost:8080/centers/1/experiments?creator=false")
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

            <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "10px", width: "200px" }}>Create Experiment</Button>

            <div className="centerHome">
                <div class="container">
                    <div class="row align-items-center my-4">
                        {/* <div class="col-lg-7">
                                <img
                                    class="img-fluid rounded mb-4 mb-lg-0"
                                    src="http://placehold.it/900x400"
                                    alt=""
                                />
                            </div> */}
                        <div class="col-lg-6">
                            <h3 class="font-weight-light">EXPERIMENTS AS CREATOR</h3>
                            <Paper elevation={3} style={paperStyle}>

                                <ExperimentList experiments={creatorExperiments} />

                            </Paper>
                        </div>

                        <div class="col-lg-6">
                            <h3 class="font-weight-light">EXPERIMENTS AS PARTICIPANT</h3>
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