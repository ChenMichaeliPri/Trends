import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

import {CustomDot} from "./CustomDot";
import {ChartData} from "./chart.types";


type ChartProps={
  data:ChartData[]
}

export const Chart = ({data}:ChartProps) => {
  return (
      <LineChart width={300} height={200} data={data}  >
        <Line type="monotone" dataKey="price" dot={<CustomDot/>}/>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis width={45} />
        <Tooltip />
      </LineChart>
  );
}

