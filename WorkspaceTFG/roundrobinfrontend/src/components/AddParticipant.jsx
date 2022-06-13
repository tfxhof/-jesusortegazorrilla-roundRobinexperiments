import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@material-ui/core';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';


export function AddParticipant() {

    const [email, setEmail] = useState('');

    const { centerEmail } = useContext(CenterContext);
    const { expName } = useContext(ExpContext);


    let navigate = useNavigate();


    let url = "http://localhost:8080/experiments/";
    url = url.concat(String(expName));
    url = url.concat("/participants");

    async function handleClick() {
        const researchCenter = {
            email,
        }

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(researchCenter)
        })
        // .then((result) => {
        //     console.log(email);
        //     setCenterEmail(email);
        //     console.log("Correo del centro: ");
        //     console.log(centerEmail);
        // })
        if (response.ok) {
            //setCenterEmail(email); //No estoy seguro de que sobre pero creo que si
            console.log("Research Center Added " + centerEmail);
            navigate('/ExperimentOverview');
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot add Research Center");
        }
    }

    return (
        <Fragment>
            <div class="page-titles">
                Add Participant to '{expName}'
            </div>

            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' }, }} noValidate autoComplete="off">

                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </Box>

            <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>
                Submit
            </Button>


        </Fragment>
    )
}

export default AddParticipant;
