import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import ResultGraphMeasurement from './ResultGraphMeasurement';
import { Button } from '@material-ui/core';

export function ResultsMeasurement() {

    const [xAxisName, setXAxisName] = useState('');
    const [yAxisName, setYAxisName] = useState('');
    const [values, setValues] = useState([]);
    const [numResults, setNumResults] = useState('');
    const [numRows, setNumRows] = useState('');
 
    const [averageXAxisName, setAverageXAxisName] = useState('');
    const [averageYAxisName, setAverageYAxisName] = useState('');
    const [averageValues, setAverageValues] = useState([]);
    const [averageNumResults, setAverageNumResults] = useState('');
    const [averageNumRows, setAverageNumRows] = useState('');

    const [graphNum, setGraphNum] = useState(0);
    const [resultName, setResultName] = useState('');
    const [clicked, setClicked] = useState('false');

    const { expName } = useContext(ExpContext);
    const { measureName } = useContext(ExpContext);
    const { expStatus, setExpStatus } = useContext(ExpContext);
    const { measurementName } = useContext(ExpContext);




    //To get the result data
    useEffect(() => {
        loadGraphData();
    }, [])

    async function load() {
        await loadGraphData();
        setClicked('true');
    }

    async function loadGraphData() {

        let url = "http://localhost:8080/measurements/"
        url = url.concat(measurementName)
        url = url.concat("/results")
        let response = await fetch(url)

        if (response.ok) {
            let json = await response.json();
            setXAxisName(json[0].xAxisName)
            setYAxisName(json[0].yAxisName)
            setNumResults(json.length)
            setNumRows(json[0].values.length)

            //Clear the array to insert data from zero
            setValues([]);
            json.map((item) => (
                setValues((values) => {
                    return [...values, item.values];
                })
            ))
        }

        //To obtain the average
        url = "http://localhost:8080/measurements/"
        url = url.concat(measurementName)
        url = url.concat("/results/average")
        response = await fetch(url)

        if (response.ok) {
            let json = await response.json();
            setAverageXAxisName(json.xAxisName)
            setAverageYAxisName(json.yAxisName)
            setAverageNumResults(json.length)
            setAverageNumRows(json.values.length)

            //Clear the array to insert data from zero
            setAverageValues(json.values);
            // json.map((item) => (
            //     setAverageValues((values) => {
            //         return [...values, item.values];
            //     })
            // ))
        }

    }


    return (
        <Fragment>
            <div class="page-titles">
                '{measurementName}' - Graph Results
            </div>

            <div id="result-name">
                <b>{resultName}</b>
                {/* {resultName} */}
            </div>


            <div>
                <div class="container">
                    <div class="row my-4 columns-center-vertical">
                        
                        {clicked === 'true' ?
                            <div class="col-lg-12">
                                <ResultGraphMeasurement
                                    xAxisName={xAxisName}
                                    yAxisName={yAxisName}
                                    values={values}
                                    numResults={numResults}
                                    numRows={numRows} 
                                    
                                    averageXAxisName={averageXAxisName} 
                                    averageYAxisName={averageYAxisName} 
                                    averageValues={averageValues}
                                    />
                            </div>
                            :
                            <div class="col-lg-12">
                                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={load}>
                                    load graph
                                </Button>
                            </div>
                        }

                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default ResultsMeasurement;
