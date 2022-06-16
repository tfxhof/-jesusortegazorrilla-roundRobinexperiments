import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
// import TextField from '@mui/material/TextField';
// import EditIcon from '@mui/icons-material/Edit';

export function MeasurementOverview() {

    const [experiment, setExperiment] = useState('');

    const { expName } = useContext(ExpContext);
    const { expStatus } = useContext(ExpContext);
    const { measureName } = useContext(ExpContext);
    const { measureInstructions } = useContext(ExpContext);

    // To get the Experiment Name and description
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

    function addPersonalInfo() {
        navigate('/AddPersonalInfo');
    }
    function addInstrument() {
        navigate('/AddInstrument');
    }
    function addResult() {
        navigate('/AddResult');
    }



    return (
        <Fragment>

            <div class="page-titles">
                Measuring '{measureName}'
            </div>

            <div>
                <div class="container">
                    <div class="row my-4 columns">

                        {/* To show the experiment main info */}
                        <div class="col-lg-6">
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

                        <div class="col-lg-6">
                            <div class="column-title">
                                <b>Modify Measurement</b>
                                <br />
                            </div>
                            {expStatus === "STARTED" ?

                                // To modify the experiment lists (add samples, test, participants...)
                                <Fragment>
                                    <div className='column-button'>
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "0px auto auto auto", width: "200px" }} onClick={addPersonalInfo}>
                                            ADD PERSONAL INFO
                                        </Button>
                                    </div>
                                    <div className='column-button'>
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addInstrument}>
                                            ADD INSTRUMENT
                                        </Button>
                                    </div>
                                    <div className='column-button'>
                                        <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addResult}>
                                            ADD RESULT
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

export default MeasurementOverview;
