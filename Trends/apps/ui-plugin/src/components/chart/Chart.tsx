import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';

import {StoresData} from "./chart.types";
import {Grid, Typography} from "@mui/material";
import {CHART} from "./chart.constants";
import {UserSettings} from "../settings/settings.types";

type ChartProps={
  storesData:StoresData,
  minPrice:number,
  maxPrice:number,
  averagePrice:number
  standardDeviation:number
  userSettings :UserSettings
}

export const Chart = ({minPrice,maxPrice,averagePrice,standardDeviation,storesData, userSettings}:ChartProps) => {
  const {
    showMinPrice,
    showMaxPrice,
    showAveragePrice,
    showStandardDeviation,
    showAmazonData,
    showIvoryData,
    showKSPData
  } = userSettings
  return (
    <Grid container spacing={1}>
      {showMinPrice && <Grid item xs={6}>
        <Typography>{CHART.MIN_PRICE_TEXT.replace('{minPrice}', minPrice.toString())}</Typography>
      </Grid>}
      {showMaxPrice && <Grid item xs={6}>
        <Typography>{CHART.MAX_PRICE_TEXT.replace('{maxPrice}', maxPrice.toString())}</Typography>
      </Grid>}
      {showAveragePrice && <Grid item xs={6}>
        <Typography>{CHART.AVERAGE_PRICE_TEXT.replace('{averagePrice}', averagePrice.toString())}</Typography>
      </Grid>}
      {showStandardDeviation && <Grid item xs={6}>
        <Typography>{CHART.STANDARD_DEVIATION_TEXT.replace('{standardDeviation}', standardDeviation.toString())}</Typography>
      </Grid>}
      {(showAmazonData || showIvoryData || showIvoryData ) && <Grid item xs={12}>
        <LineChart width={350} height={200}>
          {Object.entries(storesData).map(([name, data]) => (
            <Line data={data} name={name} dataKey="price" key={name} dot={<></>}/>
          ))}
          <CartesianGrid strokeDasharray="5 5"/>
          <XAxis dataKey="date" allowDuplicatedCategory={false}/>
          <YAxis width={45}/>
          <Tooltip/>
          <Legend/>
        </LineChart>
      </Grid>}
    </Grid>
  );
}

