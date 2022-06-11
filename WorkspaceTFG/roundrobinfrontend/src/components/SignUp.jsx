import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { CenterContext } from '../providers/CenterContext';


export function SignUp() {
    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }
    //margin goes like up-left-down-right

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [dutyManagerName, setDutyManagerName] = useState('')
    const [searchedResearchCenter, setSearchedResearchCenter] = useState('')
    const [researchCenters, setResearchCenters] = useState([])

    const { centerEmail, setCenterEmail } = useContext(CenterContext);

    let navigate = useNavigate();

    const aux = (e) => {
        console.log(centerEmail);
    }

    //To add a new research center
    async function handleClick() {
        //e.preventDefault();
        const researchCenter = { name: name, email, contactInfo: { country, city, address, dutyManagerName } }

        let response = await fetch("http://localhost:8080/centers", {
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
            setCenterEmail(email);
            console.log("Research Center Added " + centerEmail);
            navigate('/CenterHome');
        } else {
            // TODO: advertise that there is already a center with given email or name
            console.log("Cannot add Research Center");
        }
    }


    // //To get the research centers
    // useEffect(() => {
    //     fetch("http://localhost:8080/centers")
    //         .then(res => res.json())
    //         .then((result) => {
    //             setResearchCenters(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])

    // //To get the research centers
    // useEffect(() => {
    //     fetch("http://localhost:8080/centers/1")
    //         .then(res => res.json())
    //         .then((result) => {
    //             setSearchedResearchCenter(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])


    return (

        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <div class="page-titles">
                    Add new Research Center
                </div>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }}
                    onClick={handleClick}>
                    Submit
                </Button>

                {/* <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }} onClick={aux}>Aux</Button> */}

            </Paper>

            {/* <Paper elevation={3} style={paperStyle}>

                {researchCenters.map(researchCenter => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={researchCenter.id}>
                        Id: {researchCenter.id} <br></br>
                        Name: {researchCenter.name}<br></br>
                        Address: {researchCenter.address}<br></br>
                        City: {researchCenter.city}<br></br>
                        Country: {researchCenter.country}<br></br>
                        Duty Manager Name: {researchCenter.dutyManagerName}<br></br>
                    </Paper>
                ))}
            </Paper> */}
        </Fragment>
    );
}

export default SignUp;
