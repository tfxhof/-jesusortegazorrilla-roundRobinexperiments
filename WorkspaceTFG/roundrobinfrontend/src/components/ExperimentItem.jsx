import React, { useState } from 'react'

export function ExperimentItem({ experiment }) {

    const { name, description } = experiment
    return (
        // <li>
        //     {name}
        // </li>
        <div>
            {name} <br></br>
            {description}
        </div>
    )
}



// const [name, setName] = useState('')
