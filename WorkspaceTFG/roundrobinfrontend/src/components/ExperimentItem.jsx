import React, { useState, Fragment, useContext } from 'react';
import { Paper } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { ExpContext } from '../providers/ExperimentContext';

export function ExperimentItem({ experiment }) {

    const { name, description } = experiment;
    //this component subscribe to the context
    const { expName, setExpName } = useContext(ExpContext);

    const paperStyle = { padding: '20px', width: 'auto', margin: "20px auto", };
    return (

        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <NavLink className="nav-link" to="/ExperimentOverview"
                    onClick={() => {
                        setExpName(name);
                    }}
                >

                    <div class="title">
                        <b>{name}</b>
                    </div>
                    <br></br>
                    <div class="experiments">
                        {description}
                    </div>

                </NavLink>
            </Paper>
        </Fragment >
    )
}

