import React , { Fragment, useContext, useState, useEffect } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

export function ParticipantOverview() {
    
    const [experiment, setExperiment] = useState('');

    const { expName } = useContext(ExpContext);


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
                Participating in '{expName}' Experiment
            </div>



            <div>
                <div class="container">
                    <div class="row align-items-center my-4">

                        {/* To modify the experiment main info */}
                        <div class="col-lg-6">
                            <div class="title">
                                <b>{experiment.name}</b>
                            </div>
                            <br></br>
                            <div class="experiments">
                                {experiment.description}
                            </div>
                        </div>

                        {/* To modify the experiment lists (add samples, test, participants...) */}
                        <div class="col-lg-6">
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addPersonalInfo}>
                                    ADD PERSONAL INFO
                                </Button>
                            </div>

                            <div>
                                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addInstrument}>
                                    ADD INSTRUMENT
                                </Button>
                            </div>

                            <div>
                                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={addResult}>
                                    ADD RESULT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </Fragment>
    )
}

export default ParticipantOverview;
