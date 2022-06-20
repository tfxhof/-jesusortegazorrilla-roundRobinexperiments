import React, {useEffect, useContext, Fragment, useState} from 'react';
import { useNavigate } from 'react-router';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import Box from '@mui/material/Box';
import { Paper, Button } from '@material-ui/core';


export function ConfirmParticipant() {

    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }

    const { centerEmail, setCenterEmail } = useContext(CenterContext);
    const { expName, setExpName } = useContext(ExpContext);

    let navigate = useNavigate();

    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        url = url.concat("Resistencia del Carbono");                 //have to change this to the actual exp Name
        url = url.concat("/participants/");
        url = url.concat("joz826@alumnos.unican.es");                //have to change this to the actual center email
        url = url.concat("/confirm");
        setCenterEmail("joz826@alumnos.unican.es");
        const researchCenter = { 
            email: "joz826@alumnos.unican.es",
        }
        // fetch("http://localhost:8080/experiments/{name}/participants/{email}/confirm")
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(researchCenter)
        })
    }, [])


    function navigateHome(){
        navigate('/CenterHome');
    }
    
    return (
        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">
                    <div>
                        You are now participating in the experiment!
                    </div>
                </Box>

                {/* Button to register the center */}
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }}
                    onClick={navigateHome}>
                    Home
                </Button>
            </Paper>
        </Fragment>
    )
}

export default ConfirmParticipant;
