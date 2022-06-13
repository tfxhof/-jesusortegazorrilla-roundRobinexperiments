import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
import Button from '@mui/material/Button';

export function ExperimentItem({ experiment }) {

    const { name, description } = experiment;
    //this component subscribe to the context
    const { setExpName } = useContext(ExpContext);
    const { centerEmail } = useContext(CenterContext);

    let navigate = useNavigate();

    async function experimentClicked() {
        setExpName(name);
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(name));
        url = url.concat("/creator");
        console.log(url)
        // fetch("http://localhost:8080/centers/{id}/experiments?creator=true")
        let response = await fetch(url)

        let creatorEmail;
        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            creatorEmail = await response.text();
            console.log("Creator email: ");
            console.log(creatorEmail);
            console.log(centerEmail);

        }
        if (creatorEmail === centerEmail) {
            navigate("/ExperimentOverview");
        } else {
            navigate("/ParticipantOverview");
        }

    }

    return (

        <Fragment>

            <Button onClick={experimentClicked} class="expBtn">

                <div class="row align-items-center my-4 title">
                    <div class="button-title">
                        <b>{name}</b>
                    </div>
                    <br />
                    <div class="button-sub">
                        {description}
                    </div>
                </div>

            </Button>

        </Fragment >
    )
}

