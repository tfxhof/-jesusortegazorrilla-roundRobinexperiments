import React, { Fragment, PureComponent, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { ExpContext } from '../providers/ExperimentContext';


export function ResultGraph(props) {

    //Recibe un objeto con el nombre del eje X(xAxisName) y del eje Y(yAxisName), 
    //Y una lista donde cada objeto(resultGraphItem) tiene un valor del eje X(xAxisValue) e Y(yAxisValue)
    const { xAxisName, yAxisName, resultGraphItem } = props

    const data = [
        {
            // name: 'Page A',
            intensity_au: 14.06,
            raman_shift_cm: 50,
            amt: 2400,
        },
        {
            // name: 'Page B',
            intensity_au: 97.97,
            raman_shift_cm: 63.99,
            amt: 2210,
        },
        {
            // name: 'Page C',
            intensity_au: 57.11,
            raman_shift_cm: 113.97,
            amt: 2290,
        },
        {
            // name: 'Page D',
            intensity_au: 327.45,
            raman_shift_cm: 221.45,
            amt: 2000,
        },
        {
            // name: 'Page E',
            intensity_au: 205.41,
            raman_shift_cm: 308.93,
            amt: 2181,
        },
        {
            // name: 'Page F',
            intensity_au: 219.87,
            raman_shift_cm: 396.4,
            amt: 2500,
        },
        {
            // name: 'Page G',
            intensity_au: 82.14,
            raman_shift_cm: 483.88,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 56.95,
            raman_shift_cm: 571.36,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 71.86,
            raman_shift_cm: 658.83,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 75.23,
            raman_shift_cm: 746.31,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 46.22,
            raman_shift_cm: 833.79,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 50.99,
            raman_shift_cm: 921.27,
            amt: 2100,
        },
        {
            // name: 'Page G',
            intensity_au: 44.75,
            raman_shift_cm: 998.25,
            amt: 2100,
        },
        // {
        //     name: 'Page G',
        //     uv: 3490,
        //     pv: 4300,
        //     amt: 2100,
        // },
    ];


    return (
        <Fragment>
            <div class="graph-container">
                <div className='graph-width'>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <LineChart width={600} height={500} data={data}
                            margin={{ top: 10, right: 20, left: 20, bottom: 20 }} >

                            <CartesianGrid strokeDasharray="4 3" /> {/* This values are the discontinuous lines, first are the black pixels and second are white pixels */}
                            <XAxis dataKey="raman_shift_cm" >
                                <Label value={xAxisName} position="bottom" />
                            </XAxis>
                            <YAxis >
                                <Label value={yAxisName} angle="-90" position='insideLeft' />
                            </YAxis>
                            <Tooltip />
                            <Line type="monotone" dataKey="intensity_au" stroke="#8884d8" activeDot={{ r: 8 }} />
                            {/* <Line type="monotone" dataKey="intensity_au" stroke="#82ca9d" /> */}
                            <Legend verticalAlign="top" height={36} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Fragment>
    );
}
export default ResultGraph;