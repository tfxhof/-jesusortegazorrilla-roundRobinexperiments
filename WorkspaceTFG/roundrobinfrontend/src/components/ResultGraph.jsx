import React, { Fragment, PureComponent, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { ExpContext } from '../providers/ExperimentContext';
import LineList from './LineList';


export function ResultGraph(props) {

    //Recibe un objeto con el nombre del eje X(xAxisName) y del eje Y(yAxisName), 
    //Y una lista donde cada objeto(resultGraphItem) tiene un valor del eje X(xAxisValue) e Y(yAxisValue)
    const { xAxisName, yAxisName, values, numResults, numRows, averageXAxisName, averageYAxisName, averageValues } = props
    const datos = []
    var value = 'value';
    let dato;


    //iterate to obtain each iteration the first YValue for all the results, so i have to iterate al many rows as the results have
    for (let pos = 0; pos < numRows; pos++) {
        dato = {};
        for (let i = 0; i < numResults; i++) {
            if (i === 0) {
                dato = {
                    xValue: values[i][pos].xAxisValue,
                    yValue1: values[i][pos].yAxisValue,
                }
            }
            else {
                dato["yValue" + (i+1)] = values[i][pos].yAxisValue
            }
        }
        Object.assign(dato, {yValueAverage:averageValues[pos].yAxisValue,})
        datos.push(dato);
    }


    const data = [
        {
            // name: 'Page A',
            xValue: values[0][0].xAxisValue,
            yValue1: values[0][0].yAxisValue,
            yValue2: values[1][0].yAxisValue,
            yValue3: values[2][0].yAxisValue,

            amt: 2400,
        },
        {
            // name: 'Page B',
            xValue: values[0][1].xAxisValue,
            yValue1: values[0][1].yAxisValue,
            yValue2: values[1][1].yAxisValue,
            yValue3: values[2][1].yAxisValue,
            amt: 2210,
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
                    <div>
                        {datos[543].xYalue0}

                    </div>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <LineChart width={600} height={500} data={datos}
                            margin={{ top: 0, left: 20, right: 0, bottom: 20 }} >

                            <CartesianGrid strokeDasharray="4 3" /> {/* This values are the discontinuous lines, first are the black pixels and second are white pixels */}
                            <XAxis dataKey="xValue" >
                                <Label value={xAxisName} position="bottom" />
                            </XAxis>
                            <YAxis >
                                <Label value={yAxisName} angle="-90" position='insideLeft' />
                            </YAxis>
                            <Tooltip />

                            {/* <LineList /> */}

                            {/* {
                                [...Array(numResults)].map((e, i) =>
                                    <Line dataKey="yValue0" stroke="#FE3429" />
                                )
                            } */}

                            <Line dataKey="yValueAverage" stroke="blue" dot={false} strokeWidth={2} name="Average"/>
                            <Line dataKey="yValue1" stroke="#FE0000" dot={false} strokeWidth={0.6} name="1"/>
                            <Line dataKey="yValue2" stroke="#FE3429" dot={false} strokeWidth={0.6} name="2"/>
                            <Line dataKey="yValue3" stroke="#E61616" dot={false} strokeWidth={0.6} name="3"/>

                            <Line dataKey="yValue4" stroke="green" dot={false} strokeWidth={0.6}
                            points={[ {x: 240.6, y:3500, value:240.6}, {x: 242.4, y:3500, value:242.4} ]} name="4"/>

                            <Line dataKey="yValue5" stroke="#C74040" dot={false} strokeWidth={0.6} name="5"/>
                            <Line dataKey="yValue6" stroke="#BC4040" dot={false} strokeWidth={0.6} name="6"/>
                            <Line dataKey="yValue7" stroke="#A84646" dot={false} strokeWidth={0.6} name="7"/>
                            <Line dataKey="yValue8" stroke="#973F3F" dot={false} strokeWidth={0.6} name="8"/>
                            <Line dataKey="yValue9" stroke="#814545" dot={false} strokeWidth={0.6} name="9"/>
                            <Line dataKey="yValue10" stroke="#6F3A3A" dot={false} strokeWidth={0.6} name="10"/>
                            <Line dataKey="yValue11" stroke="#633E3E" dot={false} strokeWidth={0.6} name="11"/>
                            <Line dataKey="yValue12" stroke="#4A3030" dot={false} strokeWidth={0.6} name="12"/>
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