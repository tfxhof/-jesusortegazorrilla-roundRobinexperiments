import React, {useState, Fragment, useContext} from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';

import {useLocation} from "react-router-dom";


export function SignUpParticipant() {
   
    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [dutyManagerName, setDutyManagerName] = useState('')


    //To get the query params
    const search = useLocation().search;
    const centerEmailQuery = new URLSearchParams(search).get('centerEmail');
    const expNameQuery = new URLSearchParams(search).get('expName');
    const codeQuery = new URLSearchParams(search).get('code');

    //To set the center and experiment data
    const { setCenterEmail } = useContext(CenterContext);
    const { setExpName } = useContext(ExpContext);


    let navigate = useNavigate();

    //To add a new research center
    async function handleClick() {
        //e.preventDefault();
        const researchCenter = { 
            name,
            password,
            email: centerEmailQuery, 
            contactInfo: { 
                country, 
                city, 
                address, 
                dutyManagerName
            }
        }

        let url = "http://localhost:8080/experiments/";
        url = url.concat(expNameQuery);
        url = url.concat("/participants/");
        url = url.concat(centerEmailQuery);
        url = url.concat("/confirm?code=");
        url = url.concat(codeQuery);
        console.log(url);
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(researchCenter)
        })
        
        if (response.ok) {
            setCenterEmail(centerEmailQuery);
            setExpName(expNameQuery);
            navigate('/ConfirmParticipant');
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot add Research Center");
        }
    }

    
    return (

        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <div class="page-titles">
                    Register new Research Center
                </div>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="City" variant="outlined" fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="Country" variant="outlined" fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="Duty Manager Name" variant="outlined" fullWidth
                        value={dutyManagerName}
                        onChange={(e) => setDutyManagerName(e.target.value)}
                    />

                </Box>

                {/* Button to register the center */}
                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }}
                    onClick={handleClick}>
                    Submit
                </Button>
                
            </Paper>
        </Fragment>

    )
}
export default SignUpParticipant;
