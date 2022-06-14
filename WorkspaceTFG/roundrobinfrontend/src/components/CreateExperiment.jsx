import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import { Button } from '@material-ui/core';
import { Box, TextField } from '@mui/material';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



export function CreateExperiment() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [creatorEmail, setCreatorEmail] = useState('')

    const { centerEmail } = useContext(CenterContext);
    const { expName, setExpName } = useContext(ExpContext);

    const [post, setPost] = React.useState(null);

    // This is to handle the 'participates?' checkbox
    const initialValues = {
        participates: 'no',
    }
    const [values, setValues] = useState(initialValues);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }


    let navigate = useNavigate();

    //To add a new experiment
    async function createExperimentButton() {
        //e.preventDefault()
        const experiment = {
            name,
            description,
            creator: {
                email: centerEmail
            }
        }

        console.log("Participa?????  ");
        console.log(values.participates);

        let url = "http://localhost:8080/experiments?participates=";

        url = values.participates === "yes" ? url.concat("yes") : url.concat("no");
        console.log(url);

        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiment)
        })

        if (response.ok) {
            setExpName(name);
            console.log("Experiment Added");
            console.log(expName);
            navigate("/ExperimentOverview");
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
            </div>

            {/* Text Fields to introduce the data */}
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

                {/* Field to mark the center as participant of the experiment or no */}
                <FormControl>
                    <div id="form-successful">
                        <FormLabel id="demo-row-radio-buttons-group-label">Are you going to participate in the experiment? </FormLabel>
                    </div>
                    <RadioGroup row
                        name="participates"
                        value={values.participates}
                        onChange={handleInputChange}
                    >
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    </RadioGroup>
                </FormControl>


            </Box>

            {/* Button to create the experiment */}
            <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto", width: "200px" }}
                onClick={createExperimentButton}>
                Submit
            </Button>

        </Fragment>
    )
}

export default CreateExperiment;
