import React, { Fragment, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import Button from '@mui/material/Button';



export function CreatorMeasurementItem({ result }) {

    const { name } = result;


    return (

        <Fragment>
            <Button class="expBtn" style={{ width: "100%" }}>

                <div class="row align-items-center my-4 measure">
                    <div class="button-title">
                        <b>{name}</b>
                    </div>
                </div>

            </Button>

        </Fragment >
    )

}