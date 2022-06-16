import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
import Button from '@mui/material/Button';

export function ExperimentItem({ experiment }) {

    const { name, description } = experiment;
    //this component subscribe to the context
    const { setExpName } = useContext(ExpContext);
    const { setExpStatus } = useContext(ExpContext);
    const { centerEmail } = useContext(CenterContext);

    let navigate = useNavigate();

    async function experimentClicked() {
        setExpName(name);
        let url = "http://localhost:8080/experiments/";
        url = url.concat(String(name));
        //url = url.concat("/creator");
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setExpStatus(result.status);
                navigate("/ExperimentOverview"); //Si falla ponerlo despues del then (vamos, bajarlo dos lineas)
            }
            )



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

