import React from 'react';
import { MeasureItem } from './MeasureItem';


export function MeasuresList({ measures }) {


    return (
        measures.map((measure) => (
            <MeasureItem key={measure.name} measure={measure} />
        ))

    )
}

export default MeasuresList;
