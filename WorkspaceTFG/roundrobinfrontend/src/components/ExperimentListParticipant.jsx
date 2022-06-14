import React from 'react';
import { ExperimentItemParticipant } from './ExperimentItemParticipant';


export function ExperimentListParticipant({ experiments }) {


    return (
        experiments.map((experiment) => (
            <ExperimentItemParticipant key={experiment.name} experiment={experiment} />
        ))

    )
}

export default ExperimentListParticipant;
