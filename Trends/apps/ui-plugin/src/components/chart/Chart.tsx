import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

import {CustomDot, CustomDotProps} from "./CustomDot";
import {ChartData} from "./chart.types";
import {Grid, Typography} from "@mui/material";
import {CHART} from "./chart.constants";

type ChartProps={
  data:ChartData[],
  minPrice:number,
  maxPrice:number,
  averagePrice:number
  variance:number
}

export const Chart = ({data,minPrice,maxPrice,averagePrice,variance}:ChartProps) => {
  return (
    <Grid container width={350} spacing={1}>
      <Grid item xs={6}>
        <Typography>{CHART.MIN_PRICE_TEXT.replace('{minPrice}',minPrice.toString())}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{CHART.MAX_PRICE_TEXT.replace('{maxPrice}',maxPrice.toString())}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{CHART.AVERAGE_PRICE_TEXT.replace('{averagePrice}',averagePrice.toString())}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{CHART.VARIANCE_TEXT.replace('{variance}',variance.toString())}</Typography>
      </Grid>
      <Grid item xs={12}>
        <LineChart width={350} height={200} data={data}  >
          <Line type="monotone" dataKey="price" dot={(props:CustomDotProps)=><CustomDot {...props}/>}/>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis width={45} />
          <Tooltip />
        </LineChart>
      </Grid>
    </Grid>
  );
}

