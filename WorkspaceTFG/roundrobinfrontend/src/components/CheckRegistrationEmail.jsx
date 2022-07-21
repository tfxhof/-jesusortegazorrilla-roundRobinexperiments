import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import { Paper, Button } from '@material-ui/core';
import Box from '@mui/material/Box';


export function CheckRegistrationEmail() {

    const paperStyle = { padding: '20px', width: 600, margin: "50px auto" }

    let navigate = useNavigate();

    //To get the query params
    const search = useLocation().search;
    const centerEmailQuery = new URLSearchParams(search).get('centerEmail');




    return (
        <Fragment>
            <Paper elevation={3} style={paperStyle}>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%', marginTop: '20px' }, }} noValidate autoComplete="off">
                    <div>
                        Check your email inbox to confirm the registration
                         {/*<b>{centerEmailQuery}</b>. */}
                    </div>
                </Box>

            </Paper>
        </Fragment>

    )
}

export default CheckRegistrationEmail;
