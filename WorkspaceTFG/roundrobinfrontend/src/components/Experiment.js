import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';

export default function Experiment() {
    const paperStyle={padding:'20px', width:600, margin:"20px auto"}
    //margin goes like up-left-down-right

    const[name, setName]=useState('')
    const[description, setDescription]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const experiment={name,description}
        console.log(experiment)
        fetch("http://localhost:8080/experiments",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(experiment)
    
    }).then(()=>{
        console.log("Experiment Added")
    })
}
    
    return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}>Create Experiment</h1>

            <Box component="form" sx={{ '& > :not(style)': { m: 1, width:'95%'}, }} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </Box>
            <Button variant="contained" style={{backgroundColor:"blue", color:"white", margin:"20px auto auto auto"}} onClick={handleClick}>Submit</Button>
        </Paper>
    </Container>
  );
}
