import React from 'react';
import { ParticipantMeasurementItem } from './ParticipantMeasurementItem';


export function ParticipantMeasurementsList({ measurements }) {


    return (
        measurements.map((measurement) => (
            <ParticipantMeasurementItem key={measurement.name} measurement={measurement} />
        ))

    )
}

export default ParticipantMeasurementsList;
