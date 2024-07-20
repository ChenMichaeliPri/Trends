import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import {ChartData, StoresData} from "./chart.types";
import {Grid, Typography} from "@mui/material";
import {CHART, shopIdToNameMap} from "./chart.constants";
import {UserSettings} from "../settings/settings.types";

type ChartProps={
  chartData:ChartData,
  storesData:StoresData,
  userSettings :UserSettings
}

export const Chart = ({chartData,storesData, userSettings}:ChartProps) => {
  const {
    inDarkMode,
    showCurrentPrice,
    showMinPrice,
    showMaxPrice,
    showAveragePrice,
    showStandardDeviation,
    showAmazonData,
    showIvoryData,
    showKSPData
  } = userSettings;
  const {
    currentPrice,
    minPrice,
    maxPrice,
    averagePrice,
    standardDeviation
  } = chartData;
  const filerStores = (storeId:string)=>{
    switch (storeId) {
      case '1': return showAmazonData;
      case '2': return showKSPData;
      case '3': return showIvoryData;
      default: return false;
    }
  }

  return (
    <Grid container spacing={1}>
      {showCurrentPrice && (<Grid item xs={6}>
          <Typography>{CHART.CURRENT_PRICE_TEXT.replace('{currentPrice}',currentPrice?.toString())}</Typography>
        </Grid>
      )}
      {showMinPrice && <Grid item xs={6}>
        <Typography>{CHART.MIN_PRICE_TEXT.replace('{minPrice}', minPrice?.toString())}</Typography>
      </Grid>}
      {showMaxPrice && <Grid item xs={6}>
        <Typography>{CHART.MAX_PRICE_TEXT.replace('{maxPrice}', maxPrice?.toString())}</Typography>
      </Grid>}
      {showAveragePrice && <Grid item xs={6}>
        <Typography>{CHART.AVERAGE_PRICE_TEXT.replace('{averagePrice}', averagePrice?.toString())}</Typography>
      </Grid>}
      {showStandardDeviation && <Grid item xs={6}>
        <Typography>{CHART.STANDARD_DEVIATION_TEXT.replace('{standardDeviation}', standardDeviation?.toString())}</Typography>
      </Grid>}
      {(showAmazonData || showIvoryData || showKSPData ) && <Grid item  xs={12}>
      <ResponsiveContainer width={'100%'} height={200} >
        <LineChart>
          {Object.entries(storesData).filter(([storeId])=>filerStores(storeId)).map(([shopId, data]) => (
            <Line data={data} name={shopIdToNameMap[shopId].storeName} dataKey="price" stroke={shopIdToNameMap[shopId].lineColor} key={shopId} dot={false}/>
          ))}
          <CartesianGrid strokeDasharray="5 5"/>
          <XAxis dataKey="date" allowDuplicatedCategory={false}/>
          <YAxis width={45}/>
          <Tooltip/>
          <Legend/>
        </LineChart>
      </ResponsiveContainer>
      </Grid>}
    </Grid>
  );
}