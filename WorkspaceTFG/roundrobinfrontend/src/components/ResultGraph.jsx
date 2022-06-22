import React, { Fragment, PureComponent, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { ExpContext } from '../providers/ExperimentContext';


export function ResultGraph(props) {

    //Recibe un objeto con el nombre del eje X(xAxisName) y del eje Y(yAxisName), 
    //Y una lista donde cada objeto(resultGraphItem) tiene un valor del eje X(xAxisValue) e Y(yAxisValue)
    const { xAxisName, yAxisName, values } = props
const data = []
    

for (let i in values) {
    let dato = {xValue: values[i].xAxisValue, yValue: values[i].yAxisValue};
    data.push(dato);
}

    // const data = [
    //     {
    //         // name: 'Page A',
    //         xValue: values[0].xAxisValue,
    //         yValue: values[0].yAxisValue,
    //         amt: 2400,
    //     },
    //     {
    //         // name: 'Page B',
    //         xValue: values[1].xAxisValue,
    //         yValue: values[1].yAxisValue,
    //         amt: 2210,
    //     },
    //     {
    //         // name: 'Page C',
    //         xValue: values[2].xAxisValue,
    //         yValue: values[2].yAxisValue,
    //         amt: 2290,
    //     },
    //     {
    //         // name: 'Page D',
    //         xValue: values[3].xAxisValue,
    //         yValue: values[3].yAxisValue,
    //         amt: 2000,
    //     },
        
    //     // {
    //     //     name: 'Page G',
    //     //     uv: 3490,
    //     //     pv: 4300,
    //     //     amt: 2100,
    //     // },
    // ];


    return (
        <Fragment>
            <div class="graph-container">
                <div className='graph-width'>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <LineChart width={600} height={500} data={data}
                            margin={{ top: 10, right: 20, left: 20, bottom: 20 }} >

                            <CartesianGrid strokeDasharray="4 3" /> {/* This values are the discontinuous lines, first are the black pixels and second are white pixels */}
                            <XAxis dataKey="xValue" >
                                <Label value={xAxisName} position="bottom" />
                            </XAxis>
                            <YAxis >
                                <Label value={yAxisName} angle="-90" position='insideLeft' />
                            </YAxis>
                            <Tooltip />
                            <Line type="monotone" dataKey="yValue" stroke="#8884d8" activeDot={{ r: 8 }} />
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