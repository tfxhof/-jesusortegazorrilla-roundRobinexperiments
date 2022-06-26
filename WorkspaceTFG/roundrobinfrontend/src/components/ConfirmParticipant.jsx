import React, {useEffect, useContext, Fragment, useState} from 'react';
import { useNavigate } from 'react-router';
import { CenterContext } from '../providers/CenterContext';
import { ExpContext } from '../providers/ExperimentContext';
import Box from '@mui/material/Box';
import { Paper, Button } from '@material-ui/core';


export function ConfirmParticipant(props) {

    const {propsMail} = props;

    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }

    const { centerEmail, setCenterEmail } = useContext(CenterContext);
    const { expName, setExpName } = useContext(ExpContext);

    let navigate = useNavigate();

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
