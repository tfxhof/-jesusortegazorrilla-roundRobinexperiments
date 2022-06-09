import { Button } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import React, { Fragment, useState } from 'react';
//import TextField from '@mui/material/TextField';

export function CreateExperiment() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [creatorName, setCreatorName] = useState('')

    //To add a new experiment
    const createExperimentButton = (e) => {
        e.preventDefault()
        //const contactInfo = { country: country, city: city, address: address, dutyManagerName: dutyManagerName };
        //create the research center with the info of it
        //const experiment = { name: name, description: description, creatorName: creatorName }
        const experiment = { name: name, description: description }
        fetch("http://localhost:8080/experiments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiment)
        }).then(() => {
            console.log("Research Center Added")
        })
    }

    return (
        <Fragment>

            <h1 style={{ color: "blue", margin: "20px" }}>Create Experiment</h1>

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

            <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto", width: "200px" }} onClick={createExperimentButton}>Submit</Button>

        </Fragment>
    )
}

export default CreateExperiment;
