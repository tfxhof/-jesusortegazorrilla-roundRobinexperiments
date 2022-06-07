import React from 'react';
import { ExperimentItem } from './ExperimentItem';

export function ExperimentList({ experiments }) {
  return (
    <ul> 
        {experiments.map((experiment) => (
            <ExperimentItem experiment={experiment} />
        ))}
    </ul>
  )
}
