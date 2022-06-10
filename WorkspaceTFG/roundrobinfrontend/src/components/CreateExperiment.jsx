import React, { Fragment, useState, useContext, useEffect } from 'react';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export function CreateExperiment() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const { centerEmail } = useContext(CenterContext);
    const { expName, setExpName } = useContext(ExpContext);
    const [creatorEmail, setCreatorEmail] = useState('')

    const [post, setPost] = React.useState(null);

    //To add a new experiment
    async function createExperimentButton() {
        //e.preventDefault()
        const experiment = { name: name, description: description, creator: { email: centerEmail } }
        console.log({ centerEmail })
        let response = await fetch("http://localhost:8080/experiments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiment)
        })

        if (response.ok) {
            setExpName(name);
            console.log("Experiment Added");
            console.log(expName);
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot add Experiment");
        }
    }


    async function button() {
        const experiment = { name: name, description: description, creator: { email: centerEmail } }
        let url = "http://localhost:8080/experiments";
        axios.post(url, {
            name: name,
            description: description,
            creator: {
                email: centerEmail
            }
        })
            .then((response) => {
                setPost(response.data);
                console.log("Estoy dentro: ");
                setExpName(name);
                console.log("Voy a salir : " + { name } + " " + { expName });
            });
    };

    return (
        <Fragment>

            <div class="page-titles">
                Create Experiment
            </div>
           
            <div>
                {centerEmail}
                <br></br>
                {name}
                <br></br>
                {expName}
            </div>


            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '50%' }, marginTop: "20px" }} noValidate autoComplete="off">

                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
            <NavLink className="nav-link" onClick={button} to="/ExperimentOverview">
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }}
                    onClick={() => {
                        setExpName(name);
                    }}>
                    Submit
                </Button>
            </NavLink>
        </Fragment>
    )
}

export default CreateExperiment;
