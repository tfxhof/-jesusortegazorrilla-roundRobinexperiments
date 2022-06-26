import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import { Paper, Button } from '@material-ui/core';
import Box from '@mui/material/Box';


export function ConfirmAssistance() {

    const paperStyle = { padding: '20px', width: 600, margin: "50px auto" }

    let navigate = useNavigate();

    //To get the query params
    const search = useLocation().search;
    const centerEmailQuery = new URLSearchParams(search).get('centerEmail');
    const expNameQuery = new URLSearchParams(search).get('expName');
    const codeQuery = new URLSearchParams(search).get('code');

    //To set the center and experiment data
    const { setCenterEmail } = useContext(CenterContext);
    const { setExpName } = useContext(ExpContext);


    //To add a new research center
    async function confirm() {
        //e.preventDefault();
        const researchCenter = {
            email: centerEmailQuery,
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
            console.log("Cannot confirm");
        }
    }




    return (
        <Fragment>
            <Paper elevation={3} style={paperStyle}>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%', marginTop: '20px' }, }} noValidate autoComplete="off">
                    <div>
                        Confirm that <b>{centerEmailQuery}</b> is going to participate in <b>{expNameQuery}</b>
                    </div>
                </Box>

                {/* Button to register the center */}
                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto 20px auto" }}
                    onClick={confirm}>
                    Confirm
                </Button>
            </Paper>
        </Fragment>

    )
}

export default ConfirmAssistance;
