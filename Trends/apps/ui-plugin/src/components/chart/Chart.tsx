import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import {StoresData} from "./chart.types";
import { shopIdToNameMap } from "./chart.constants";
import {UserSettings} from "../settings/settings.types";

type ChartProps={
  storesData:StoresData,
  userSettings :UserSettings
}

export const Chart = ({storesData, userSettings}:ChartProps) => {
  const {
    showAmazonData,
    showIvoryData,
    showKSPData
  } = userSettings;

  const filerStores = (storeId:string)=>{
    switch (storeId) {
      case '1': return showAmazonData;
      case '2': return showKSPData;
      case '3': return showIvoryData;
      default: return false;
    }
  }
  return (
    <>
      {(showAmazonData || showIvoryData || showKSPData ) && (<ResponsiveContainer width={'100%'} height={250} >
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
      </ResponsiveContainer>)}
    </>
  );
}

