import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { Paper } from '@material-ui/core';
import CreatorMeasurementsList from './CreatorMeasurementsList';

export function MeasureOverview() {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto" };

    const [experiment, setExperiment] = useState('');
    const [measurements, setMeasurements] = useState([]);

    const { expName } = useContext(ExpContext);
    const { expStatus } = useContext(ExpContext);
    const { measureName } = useContext(ExpContext);
    const { measureInstructions } = useContext(ExpContext);
    const { centerName } = useContext(CenterContext);
    const { centerEmail } = useContext(CenterContext);

    // To get the Experiment Name and description
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


    // To get the list of measurements
    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/measures/");
        url = url.concat(String(measureName));
        url = url.concat("/measurements");
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setMeasurements(result);
            }
            )
    }, [])


    let navigate = useNavigate();

    async function addMeasurement() {
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/measures/");
        url = url.concat(String(measureName));
        url = url.concat("/measurements");
        console.log(url);

        const measurement = {
            name: "nombre",
            measureName: measureName,

            executingCenter : {
                email: centerEmail,
            },
         }

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(measurement)
        })

        if (response.ok) {
            navigate('/ParticipantMeasurementOverview');
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot add Measurement");
        }

    }


    function compareResults() {
        navigate('/ResultsMeasure');
    }


    return (
        <Fragment>

            <div class="page-titles">
                '{measureName}' - Measure
            </div>

            <div>
                <div class="container">
                    <div class="row my-4 columns">

                        {/* To show the experiment main info */}
                        <div class="col-lg-4">
                            <div class="column-title">
                                <b>Experiment Data</b>
                                {/* <h3>Measures</h3> */}
                                <br />
                            </div>
                            <div class="experiment-title">
                                <b>{experiment.name}</b>
                            </div>
                            <br></br>
                            <div class="description">
                                {experiment.description}
                            </div>

                            <div id="measure-instructions">
                                <b>Measure Instructions</b>
                                {/* <h3>Measures</h3> */}
                                <br />
                            </div>
                            <div class="description">
                                {measureInstructions}
                            </div>


                        </div>

                        {/* To show the experiment created measures */}
                        <div class="col-lg-4">
                            <div class="column-title">
                                <b>Measurements</b>
                                {/* <h3>Measures</h3> */}
                            </div>
                            <Paper elevation={3} style={paperStyle}>
                                <CreatorMeasurementsList measurements={measurements} />
                            </Paper>
                        </div>

                        <div class="col-lg-4">
                            <div class="column-title">
                                <b>Compare Results</b>
                                <br />
                            </div>
                            {expStatus === "STARTED" || expStatus === "FINISHED"  ?

                                // To modify the experiment lists (add samples, test, participants...)
                                <Fragment>
                                    <div className='column-button'>
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={compareResults}>
                                            Compare results
                                        </Button>
                                    </div>
                                </Fragment>
                                :
                                <div className='column-button finished-label'>
                                    This experiment is not running right now.
                                    <br />
                                    It is '{experiment.status}'
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MeasureOverview;
