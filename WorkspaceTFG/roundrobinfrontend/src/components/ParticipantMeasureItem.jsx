import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ExpContext } from '../providers/ExperimentContext';
import { CenterContext } from '../providers/CenterContext';
import Button from '@mui/material/Button';

export function ParticipantMeasureItem({ measure }) {

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
        navigate("/ParticipantMeasureOverview");
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

