import React, { Fragment, useState, useContext } from 'react';
import { CenterContext } from '../providers/CenterContext';
import { Button } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import { NavLink } from "react-router-dom";

export function CreateExperiment() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const { centerEmail } = useContext(CenterContext);
    const [creatorEmail, setCreatorEmail] = useState('')

    //To add a new experiment
    const createExperimentButton = (e) => {
        e.preventDefault()
        //const contactInfo = { country: country, city: city, address: address, dutyManagerName: dutyManagerName };
        //create the research center with the info of it
        //const experiment = { name: name, description: description, creatorName: creatorName }
        const experiment = { name: name, description: description, creator: { email: centerEmail } }
        console.log({ centerEmail })
        fetch("http://localhost:8080/experiments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiment)
        }).then(() => {
            console.log("Experiment Added")
        })
    }

    return (
        <Fragment>

            <h1 style={{ color: "blue", margin: "20px" }}>Create Experiment</h1>
            <div>
                {centerEmail}
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
            <NavLink className="nav-link" to="/ExperimentOverview">
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={createExperimentButton}>Submit</Button>
            </NavLink>
        </Fragment>
    )
}

export default CreateExperiment;
