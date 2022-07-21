import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import { Paper, Button } from '@material-ui/core';
import Box from '@mui/material/Box';


export function ConfirmRegistration() {

    //const { propsMail } = props;

    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }

    const { centerEmail, setCenterEmail } = useContext(CenterContext);
    const { expName, setExpName } = useContext(ExpContext);

    //To get the query params
    const search = useLocation().search;
    const centerEmailQuery = new URLSearchParams(search).get('centerEmail');
    const expNameQuery = new URLSearchParams(search).get('expName');
    const codeQuery = new URLSearchParams(search).get('code');
    const passwordQuery = new URLSearchParams(search).get('password');
    const centerNameQuery = new URLSearchParams(search).get('name');
    const addressQuery = new URLSearchParams(search).get('address');
    const cityQuery = new URLSearchParams(search).get('city');
    const countryQuery = new URLSearchParams(search).get('country');
    const dutyManagerNameQuery = new URLSearchParams(search).get('dutyManagerName');

    let navigate = useNavigate();

    //To get the research centers
    useEffect(() => {
        confirm();
    }, [])

    //To confirm the research center
    async function confirm() {
        //e.preventDefault();
        const researchCenter = {
            email: centerEmailQuery,
            password: passwordQuery,
            name: centerNameQuery,
            contactInfo: { 
                country: countryQuery, 
                city:cityQuery, 
                address: addressQuery, 
                dutyManagerName:dutyManagerNameQuery,
            }
        }

        let url = "http://localhost:8080/centers/";
        url = url.concat(centerEmailQuery);
        url = url.concat("/confirm?code=");
        url = url.concat(codeQuery);
        // url = url.concat("&password=");
        // url = url.concat(passwordQuery);
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
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot confirm");
        }
    }



    function navigateHome() {
        setCenterEmail(centerEmailQuery);
        navigate('/CenterHome');
    }

    return (
        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">
                    <div>
                        You are now registered!
                    </div>
                </Box>

                {/* Button to register the center */}
                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }}
                    onClick={navigateHome}>
                    Home
                </Button>
            </Paper>
        </Fragment>
    )
}

export default ConfirmRegistration;