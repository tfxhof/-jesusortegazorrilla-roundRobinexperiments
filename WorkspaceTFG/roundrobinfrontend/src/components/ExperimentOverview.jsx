import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

export function ExperimentOverview() {

    const [experiment, setExperiment] = useState('');
    const [status, setStatus] = useState('');

    const { expName } = useContext(ExpContext);
    const { expStatus, setExpStatus } = useContext(ExpContext);

    let description = {
        value: experiment.description,
        isInEditMode: false
    }

    function changeEditMode() {
        this.setDescription({
            isInEditMode: !this.experiment.isInEditMode
        });
    }


    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExperiment(result);
                console.log(result);
            }
            )
    }, [])

    let navigate = useNavigate();

    function addSample() {
        navigate('/addSample');
    }
    function addMeasure() {
        navigate('/addMeasure');
    }
    function addParticipant() {
        navigate('/addParticipant');
    }
    function startExperiment() {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/start");

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExpStatus(result.status);
                setExperiment(result);
                console.log(result);
            }
            )
    }

    async function finishExperiment() {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/finish");
        console.log("URL de finish: ");
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExpStatus(result.status);
                setExperiment(result);
                console.log(result);
            }
            )

    }

    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExpStatus(result.status);
                console.log(result.status);
            }
            )
    }, [])

    return (
        <Fragment>

            <div class="page-titles">
                '{expName}' Experiment
            </div>


            <div>
                <div class="container">
                    <div class="row my-4">

                        {/* To modify the experiment main info */}
                        <div class="col-lg-6">
                            <div className="column-title">
                                {/* <h3 class="font-weight-light">EXPERIMENTS AS CREATOR</h3> */}
                                <b>Experiment's Info</b>
                            </div>
                            <div class="experiment-title">
                                <b>{experiment.name}</b>
                            </div>
                            <br></br>
                            <div class="description">
                                {experiment.description}
                                <Button onClick={changeEditMode}>
                                    <EditIcon />
                                </Button>
                            </div>

                            <br></br>
                            <div class="description">
                                {experiment.status === "CREATED" ?
                                    <Fragment>
                                        <div>
                                            Experiment Status:
                                        </div>
                                        <div>
                                            {experiment.status}
                                        </div>
                                    </Fragment>
                                    : null}
                            </div>

                            <br></br>
                            <div class="description">
                                {experiment.status === "STARTED" ?
                                    <Fragment>
                                        <div>
                                            Experiment Status:
                                        </div>
                                        <div id='started-label'>
                                            {experiment.status}
                                        </div>
                                    </Fragment>
                                    : null}
                            </div>

                            <br></br>
                            <div class="description">
                                {experiment.status === "FINISHED" ?
                                    <Fragment>
                                        <div>
                                            Experiment Status:
                                        </div>
                                        <div id='finished-label'>
                                            {experiment.status}
                                        </div>
                                    </Fragment>
                                    : null}
                            </div>

                        </div>

                        {/* To modify the experiment lists (add samples, test, participants...) */}
                        <div class="col-lg-6">
                            <div className="column-title">
                                {/* <h3 class="font-weight-light">EXPERIMENTS AS CREATOR</h3> */}
                                <b>Modify Experiment</b>
                            </div>

                            <div class="column-button">
                                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addSample}>
                                    Add Samples
                                </Button>
                            </div>

                            <div class="column-button">
                                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addMeasure}>
                                    Add Measures
                                </Button>
                            </div>

                            <div class="column-button">
                                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addParticipant}>
                                    Add Participants
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                {experiment.status === "CREATED" ?
                                    <div class="button-create-experiment">
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "-200px auto auto auto", width: "200px" }} onClick={startExperiment}>
                                            Start Experiment
                                        </Button>
                                    </div> :
                                    ""
                                }
                            </div>
                            <div>
                                {experiment.status === "STARTED" ?
                                    <div class="button-create-experiment">
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "-200px auto auto auto", width: "200px" }} onClick={finishExperiment}>
                                            Finish Experiment
                                        </Button>
                                    </div> :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default ExperimentOverview;
