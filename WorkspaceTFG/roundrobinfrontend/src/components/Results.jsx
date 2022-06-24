import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import ResultGraph from './ResultGraph';
import { Button } from '@material-ui/core';

export function Results() {

    const [experiment, setExperiment] = useState('');
    const [status, setStatus] = useState('');
    const [xAxisName, setXAxisName] = useState('');
    const [yAxisName, setYAxisName] = useState('');
    const [values, setValues] = useState('');
    const [graphNum, setGraphNum] = useState(0);
    const [resultName, setResultName] = useState('');

    const { expName } = useContext(ExpContext);
    const { measureName } = useContext(ExpContext);
    const { expStatus, setExpStatus } = useContext(ExpContext);
    const { measurementName } = useContext(ExpContext);



    //To get the result data
    useEffect(() => {
        loadGraphData(0);
    }, [])

    async function loadGraphData(num) {
        let url = "http://localhost:8080/measurements/"
        url = url.concat(measurementName)
        url = url.concat("/results?resultGraphNum=")
        url = url.concat(num)
        console.log(url);
        //http://localhost:8080/measurements/'Dureza del Carbono' in 'Universidad del Atlantico'/results?resultGraphNum=0
        let response = await fetch(url)

        if (response.ok) {
            let json = await response.json();
            setXAxisName(json.xAxisName)
            setYAxisName(json.yAxisName)
            setValues(json.values)
            setResultName(json.resultName)
        } else {
            console.log("fallo: ", graphNum)
            if (num === -1) {
                setGraphNum(num + 1);
            } else {
                setGraphNum(num - 1);
            }
        }
        // .then(res => res.json())
        // .then((result) => {
        //     setXAxisName(result.xAxisName)
        //     setYAxisName(result.yAxisName)
        //     setValues(result.values)
        //     //Have to get the values that are retorned
        // }
        // )
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

                        <div class="col-lg-1">
                            <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={left}>
                                Previous
                            </Button>
                        </div>

                        <div class="col-lg-10">
                            <ResultGraph xAxisName={xAxisName} yAxisName={yAxisName} values={values} />
                        </div>

                        <div class="col-lg-1">
                            <Button variant="contained" style={{ backgroundColor: "#4488f0", color: "white", margin: "20px auto auto auto" }} onClick={right}>
                                Next
                            </Button>
                        </div>

                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Results;
