import React from 'react';
import { CreatorMeasurementItem } from './CreatorMeasurementItem';


export function CreatorMeasurementsList({ measurements }) {


    return (
        measurements.map((measurement) => (
            <CreatorMeasurementItem key={measurement.name} measurement={measurement} />
        ))

    )
}

export default CreatorMeasurementsList;
