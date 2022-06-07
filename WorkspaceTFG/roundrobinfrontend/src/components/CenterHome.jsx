import React, { Fragment, useState } from "react";
import { Paper } from '@material-ui/core';
import Button from '@mui/material/Button';

function CenterHome() {

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto" }


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

                            </Paper>
                        </div>

                        <div class="col-lg-6">
                            <h3 class="font-weight-light">EXPERIMENTS AS PARTICIPANT</h3>
                            <Paper elevation={3} style={paperStyle}>
                                <p>
                                    HOME PAGE, SHOW SOME INFO ABOUT HOW ROUND ROBIN EXPERIMENTS WORK.
                                </p>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    );
}

export default CenterHome;