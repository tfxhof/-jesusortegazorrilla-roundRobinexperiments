import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import ResultGraph from './ResultGraph';
import { Button } from '@material-ui/core';

export function Results() {

    const [experiment, setExperiment] = useState('');
    const [status, setStatus] = useState('');
    const [xAxisName, setXAxisName] = useState('');
    const [yAxisName, setYAxisName] = useState('');
    const [values, setValues] = useState([]);
    const [numResults, setNumResults] = useState('');
    const [numRows, setNumRows] = useState('');

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
        // let url = "http://localhost:8080/measurements/"
        // url = url.concat(measurementName)
        // url = url.concat("/results?resultGraphNum=")
        // url = url.concat(num)

        let url = "http://localhost:8080/measurements/"
        url = url.concat(measurementName)
        url = url.concat("/resultss")
        console.log(url);
        //http://localhost:8080/measurements/'Dureza del Carbono' in 'Universidad del Atlantico'/results?resultGraphNum=0
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
                // console.log(item.values)
                setValues((values) => {
                    return [...values, item.values];
                })
                // setValues(...values, item.values)
            ))

            // console.log("values:");
            // console.log(values[0][0].yAxisValue);
            // console.log(values[1][0].yAxisValue);
            // console.log(values[1]);
            // console.log(values);

            // setValues(json.values)
            //setResultName(json.resultName)
        }
        // else {
        //     console.log("fallo: ", graphNum)
        //     if (num === -1) {
        //         setGraphNum(num + 1);
        //     } else {
        //         setGraphNum(num - 1);
        //     }
        // }
    }

    function right() {
        setGraphNum(graphNum + 1);
        let num = graphNum + 1;
        loadGraphData(num);
    }

    function left() {
        setGraphNum(graphNum - 1);
        let num = graphNum - 1;
        loadGraphData(num);
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

                        {/* <div class="col-lg-1">
                            <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={left}>
                                Previous
                            </Button>
                        </div> */}

                        {clicked === 'true' ?

                            <div class="col-lg-12">
                                <ResultGraph
                                    xAxisName={xAxisName}
                                    yAxisName={yAxisName}
                                    values={values}
                                    numResults={numResults}
                                    numRows={numRows} />
                            </div>
                            :

                            <div>
                                <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={load}>
                                    load graph
                                </Button>
                                estoy clicked? {clicked}
                            </div>


                        }

                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Results;
