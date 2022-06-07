import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@material-ui/core';

export default function ResearchCenter() {
    const paperStyle = { padding: '20px', width: 600, margin: "20px auto" }
    //margin goes like up-left-down-right

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [dutyManagerName, setDutyManagerName] = useState('')
    const [searchedResearchCenter, setSearchedResearchCenter] = useState('')
    const [researchCenters, setResearchCenters] = useState([])

    //To add a new research center
    const handleClick = (e) => {
        e.preventDefault()
        //const contactInfo = { country: country, city: city, address: address, dutyManagerName: dutyManagerName };
        //create the research center with the info of it
        const researchCenter = { name: name, country: country, city: city, address: address, dutyManagerName: dutyManagerName }
        fetch("http://localhost:8080/centers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(researchCenter)
        }).then(() => {
            console.log("Research Center Added")
        })
    }


    //To get the research centers
    useEffect(() => {
        fetch("http://localhost:8080/centers")
            .then(res => res.json())
            .then((result) => {
                setResearchCenters(result);
                console.log(result);
            }
            )
    }, [])

    //To get the research centers
    useEffect(() => {
        fetch("http://localhost:8080/centers/1")
            .then(res => res.json())
            .then((result) => {
                setSearchedResearchCenter(result);
                console.log(result);
            }
            )
    }, [])


    return (

        <Fragment>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add new Research Center</h1>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '95%' }, }} noValidate autoComplete="off">
                    
                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <Button variant="contained" style={{ backgroundColor: "blue", color: "white", margin: "20px auto auto auto" }} onClick={handleClick}>Submit</Button>

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
