import React, { Fragment, PureComponent, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { ExpContext } from '../providers/ExperimentContext';


export function ResultGraph(props) {

    //Recibe un objeto con el nombre del eje X(xAxisName) y del eje Y(yAxisName), 
    //Y una lista donde cada objeto(resultGraphItem) tiene un valor del eje X(xAxisValue) e Y(yAxisValue)
    const { xAxisName, yAxisName, values, numResults, numRows } = props
    const datos = []
    var value = 'value';
    let dato;

    //iterate to obtain each iteration the first YValue for all the results, so i have to iterate al many rows as the results have
    for (let pos = 0; pos < numRows; pos++) {
        for (let i = 0; i < numResults; i++) {
            //eval('var ' + value + i + '= ' + values[i][pos].yAxisValue + ';');
            // dato = {
            //     xValue: values[i][pos].xAxisValue,
            //     yValue1: values[i][pos].yAxisValue,
            //     // yValue2: values[i+1][pos].yAxisValue,
            //     // yValue3: values[i+2][pos].yAxisValue,
            //     //'value + i': values[i][pos].yAxisValue,
            // };
            if (i === 0) {
                dato = {}
                dato = {
                    xValue: values[i][pos].xAxisValue,
                    yValue1: values[i][pos].yAxisValue,
                };
            }
            else if (i === 1) {
                Object.assign(dato, {yValue2: values[i][pos].yAxisValue,})
                // dato += {
                //     yValue2: values[i][pos].yAxisValue,
                // };
            }
            else if (i === 2) {
                Object.assign(dato, {yValue3: values[i][pos].yAxisValue,})
            }
            else if (i === 3) {
                Object.assign(dato, {yValue4: values[i][pos].yAxisValue,})
            }
            else if (i === 4) {
                Object.assign(dato, {yValue5: values[i][pos].yAxisValue,})
            }
            else if (i === 5) {
                Object.assign(dato, {yValue6: values[i][pos].yAxisValue,})
            }
            else if (i === 6) {
                Object.assign(dato, {yValue7: values[i][pos].yAxisValue,})
            }
            else if (i === 7) {
                Object.assign(dato, {yValue8: values[i][pos].yAxisValue,})
            }
            else if (i === 8) {
                Object.assign(dato, {yValue9: values[i][pos].yAxisValue,})
            }
            else if (i === 9) {
                Object.assign(dato, {yValue10: values[i][pos].yAxisValue,})
            }
            else if (i === 10) {
                Object.assign(dato, {yValue11: values[i][pos].yAxisValue,})
            }
        }
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
        //     // name: 'Page C',
        //     xValue: values[2].xAxisValue,
        //     yValue: values[2].yAxisValue,
        //     amt: 2290,
        // },
        // {
        //     // name: 'Page D',
        //     xValue: values[3].xAxisValue,
        //     yValue: values[3].yAxisValue,
        //     amt: 2000,
        // },

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
                        <LineChart width={600} height={500} data={datos}
                            margin={{ top: 0, left: 20,  right: 0, bottom: 20 }} >

                            <CartesianGrid strokeDasharray="4 3" /> {/* This values are the discontinuous lines, first are the black pixels and second are white pixels */}
                            <XAxis dataKey="xValue" >
                                <Label value={xAxisName} position="bottom" />
                            </XAxis>
                            <YAxis >
                                <Label value={yAxisName} angle="-90" position='insideLeft' />
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="yValue1" stroke="#FE0000" />
                            <Line dataKey="yValue2" stroke="#E61616" />
                            <Line dataKey="yValue3" stroke="#CF3131" />
                            <Line dataKey="yValue4" stroke="#C74040" />
                            <Line dataKey="yValue5" stroke="#BC4040" />
                            <Line dataKey="yValue6" stroke="#A84646" />
                            <Line dataKey="yValue7" stroke="#973F3F" />
                            <Line dataKey="yValue8" stroke="#814545" />
                            <Line dataKey="yValue9" stroke="#6F3A3A" />
                            <Line dataKey="yValue10" stroke="#633E3E" />
                            <Line dataKey="yValue11" stroke="#4A3030" />
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