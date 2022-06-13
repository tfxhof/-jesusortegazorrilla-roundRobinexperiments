import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
import Button from '@mui/material/Button';

export function MeasureItem({ measure }) {

    const { name, instructions } = measure;
    //this component subscribe to the context
    const { expName } = useContext(ExpContext);
    const { measureName, setMeasureName } = useContext(ExpContext);
    const { setMeasureInstructions } = useContext(ExpContext);
    const { centerEmail } = useContext(CenterContext);

    let navigate = useNavigate();

    //To check if actual center participates in the given measure and if true go to measurement view
    async function measureClicked() {
        setMeasureName(name);
        setMeasureInstructions(instructions);
        navigate("/MeasurementOverview");
        // Check that some measurement associated to 'clicked measure' has the given center asociated
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(expName));
        url = url.concat("/measures/");
        url = url.concat(name);
        url = url.concat("/centers/");
        url = url.concat(centerEmail);
        console.log(url)
        //url: experiments/{expName}/measures/{measureName}/centers/{centerEmail}
        let response = await fetch(url)
        if (response.ok) { // if HTTP-status is 200-299
            let text = await response.text();
            console.log(text);
        }

        // url = "http://localhost:8080/experiments/";
        // url = url.concat(String(expName));
        // url = url.concat("/measures/");
        // url = url.concat(name);
        // console.log(url)
        // let response2 = await fetch(url)

        // if (response2.ok) { // if HTTP-status is 200-299
        //     navigate("/MeasurementOverview");
        // }
    }

    return (

        <Fragment>
            <Button onClick={measureClicked} class="expBtn" style={{ width: "100%" }}>

                <div class="row align-items-center my-4 measure">
                    <div class="button-title">
                        <b>{name}</b>
                    </div>
                    <br />
                    <div class="button-sub">
                        {instructions}
                    </div>
                </div>

            </Button>

        </Fragment >
    )
}

