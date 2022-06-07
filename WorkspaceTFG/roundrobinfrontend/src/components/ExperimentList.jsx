import React from 'react'

export function ExperimentList( { experiments }) {
  return (
    <ul>
        {experiments.map((experiment) => (
            <div>
                {experiment}
                <li>
                    Exp 1
                </li>
                <li>
                    Exp 2
                </li>
            </div>
        ))}
    </ul>
  )
}
