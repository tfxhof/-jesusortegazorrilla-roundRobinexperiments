import React from 'react';
import { CreatorMeasureItem } from './CreatorMeasureItem';


export function CreatorMeasuresList({ measures }) {


    return (
        measures.map((measure) => (
            <CreatorMeasureItem key={measure.name} measure={measure} />
        ))

    )
}

export default CreatorMeasuresList;
