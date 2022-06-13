import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

export function ExperimentOverview() {

    const [experiment, setExperiment] = useState('');

    const { expName } = useContext(ExpContext);

    let description = {
        value: experiment.description,
        isInEditMode: false
    }

    function changeEditMode() {
        this.setDescription({
            isInEditMode: !this.experiment.isInEditMode
        });
    }

    let url = "http://localhost:8080/experiments/";
    url = url.concat(String(expName));

    useEffect(() => {
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

    return (
        <Fragment>

            <div class="page-titles">
                '{expName}' Experiment
            </div>


            <div>
                <div class="container">
                    <div class="row align-items-center my-4">

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
                </div>
            </div>


        </Fragment >
    )
}

export default ExperimentOverview;
