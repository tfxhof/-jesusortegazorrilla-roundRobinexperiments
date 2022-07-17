import React, { Fragment, PureComponent, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';


export function ResultGraphMeasurement(props) {

    //Recibe un objeto con el nombre del eje X(xAxisName) y del eje Y(yAxisName), 
    //Y una lista donde cada objeto(resultGraphItem) tiene un valor del eje X(xAxisValue) e Y(yAxisValue)
    const { xAxisName, yAxisName, values, numResults, numRows, averageXAxisName, averageYAxisName, averageValues } = props
    const datos = []
    var value = 'value';
    let dato;

    // let channelIds = ['1', '2']
    let channelIds = []
    for (let i = 1; i <= numResults; i++) {
        channelIds.push(i);
    }

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
                dato["yValue" + (i + 1)] = values[i][pos].yAxisValue
            }
        }
        Object.assign(dato, { yValueAverage: averageValues[pos].yAxisValue, })
        datos.push(dato);
    }


    return (
        <Fragment>
            <div class="graph-container">
                <div className='graph-width'>
                    {/* <div>
                        {datos[543].xYalue0}

                    </div> */}
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

                            {/* Draw the lines of the different results of a measurement */}
                            {
                                channelIds.map((i) => {
                                    return (<Line dataKey={`yValue${i}`} stroke="#B0B5B6" dot={false} />)
                                })
                            }

                            {/* Draw the line of the average result of a measurement */}
                            <Line dataKey="yValueAverage" stroke="#E32828" dot={false} strokeWidth={2} name="Average" />

                            <Legend verticalAlign="top" height={36} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Fragment>
    );
}
export default ResultGraphMeasurement;