import React from 'react';
import { ExperimentItem } from './ExperimentItem';


export function ExperimentList({ experiments }) {


    return (
        experiments.map((experiment) => (
            <ExperimentItem key={experiment.name} experiment={experiment} />
        ))

    )
}

export default ExperimentList;
