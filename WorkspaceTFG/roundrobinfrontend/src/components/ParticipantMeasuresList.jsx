import React from 'react';
import { ParticipantMeasureItem } from './ParticipantMeasureItem';


export function ParticipantMeasuresList({ measures }) {


    return (
        measures.map((measure) => (
            <ParticipantMeasureItem key={measure.name} measure={measure} />
        ))

    )
}

export default ParticipantMeasuresList;
