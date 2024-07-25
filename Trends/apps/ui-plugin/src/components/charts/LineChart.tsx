import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import { shopIdToNameMap } from "./charts.constants";
import { useFilterStores } from './hooks/useFilterStores';
import { StoresData } from './charts.types';
import { UserSettings } from '../settings/settings.types';

type LineChartProps={
  storesData:StoresData,
  userSettings :UserSettings
}

export const Chart = ({storesData, userSettings}:LineChartProps) => {
  const filterStores = useFilterStores(userSettings)

  return (
    <>
      {(userSettings.showAmazonData || userSettings.showIvoryData || userSettings.showKSPData ) &&
      (<ResponsiveContainer width={'100%'} height={300} >
        <LineChart>
          {Object.entries(storesData).filter(([storeId])=>filterStores(storeId)).map(([shopId, data]) => (
            <Line data={data} name={shopIdToNameMap[shopId].storeName} dataKey="price" stroke={shopIdToNameMap[shopId].lineColor} key={shopId} dot={false}/>
          ))}
          <CartesianGrid strokeDasharray="5 5"/>
          <XAxis dataKey="date" allowDuplicatedCategory={false}/>
          <YAxis width={45}/>
          <Tooltip/>
          <Legend/>
        </LineChart>
      </ResponsiveContainer>)}
      <></>
    </>
  );
}
