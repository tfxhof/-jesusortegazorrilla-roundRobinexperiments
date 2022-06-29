import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { LineItem } from './LineItem';


export function LineList({ results }) {

    // const { numResults } = results

    return (
        // results.map((result) => (
        //     <LineItem key={result.name} results={result} />
        // ))
            <Line dataKey="yValue0" stroke="#FE0000" />


        // <tbody>
        //     {console.log(numResults)}
        //     {
        //         Array.from({ length: numResults }, (_, k) => (
        //             <Line dataKey="yValue0" stroke="#FE0000" />
        //         ))
        //     }
        // </tbody>
    )
}

export default LineList;