import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ExpContext } from '../providers/ExperimentContext';
import ResultGraph from './ResultGraph';

export function Results() {

    const [experiment, setExperiment] = useState('');
    const [status, setStatus] = useState('');
    const [xAxisName, setXAxisName] = useState('');
    const [yAxisName, setYAxisName] = useState('');
    const [values, setValues] = useState('');

    const { expName } = useContext(ExpContext);
    const { measureName } = useContext(ExpContext);
    const { expStatus, setExpStatus } = useContext(ExpContext);
    const { measurementName } = useContext(ExpContext);


    //To get the result data
    useEffect(() => {
        let url = "http://localhost:8080/experiments/";
        // url = url.concat(String(expName));
        // url = url.concat("/measures/");
        // url = url.concat(String(measureName));
        // url = url.concat("/measurements/");
        // url = url.concat(String(measurementName));
        // url = url.concat("/results");

        url = "http://localhost:8080/experiments/Resistencia del Carbono/measures/Dureza del Carbono/measurements/'Dureza del Carbono' in 'Universidad del Atlantico'/results"
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setXAxisName(result.xAxisName)
                setYAxisName(result.yAxisName)
                setValues(result.values)
                //Have to get the values that are retorned
            }
            )
    }, [])



    return (
        <Fragment>
            <div class="page-titles">
                {/* '{measurementName}' - Graph Results */}
                Descomentar titulo real
            </div>

            <ResultGraph xAxisName={xAxisName} yAxisName={yAxisName} values={values} />


        </Fragment >
    )
}

export default Results;
