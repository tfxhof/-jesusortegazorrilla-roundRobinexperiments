import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
//import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { Paper } from '@material-ui/core';
//import TextField from '@mui/material/TextField';
//import EditIcon from '@mui/icons-material/Edit';
import MeasuresList from './MeasuresList';

export function ParticipantOverview() {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto" };
    const [experiment, setExperiment] = useState('');
    const [experimentMeasures, setExperimentMeasures] = useState([]);

    const { expName } = useContext(ExpContext);
    const { expStatus } = useContext(ExpContext);
    const { centerEmail } = useContext(CenterContext);

    let navigate = useNavigate();


    //To get actual experiment's name
    useEffect(() => {
        console.log("nombre del experimento: ")
        console.log(expName)
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExperiment(result);
                console.log("Result: ");
                console.log(result);
            }
            )
    }, [])

    //To get the measures for the actual experiment
    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/measures");
        // url = url.concat("/measures?email=");
        // url = url.concat(String(centerEmail));
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExperimentMeasures(result);
            }
            )
    }, [])


    return (
        <Fragment>
            <div class="page-titles">
                Participating in '{expName}' Experiment
            </div>

            <div>
                <div class="container">
                    <div class="row my-4 columns">

                        {/* To show the experiment main info */}
                        <div class="col-lg-6">
                            <div class="column-title">
                                <b>Experiment Data</b>
                                <br />
                            </div>

                            <div class="experiment-title">
                                <b>{experiment.name}</b>
                            </div>
                            <br></br>
                            <div class="description">
                                {experiment.description}
                            </div>
                            <br></br>
                            <div class="description">
                                Experiment status: 
                                <br />
                                {expStatus}
                            </div>
                        </div>

                        {/* To show the experiment created measures */}
                        <div class="col-lg-6">
                            <div class="column-title">
                                <b>Measures</b>
                                {/* <h3>Measures</h3> */}
                            </div>
                            <Paper elevation={3} style={paperStyle}>
                                <MeasuresList measures={experimentMeasures} />
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>




        </Fragment>
    )
}

export default ParticipantOverview;
