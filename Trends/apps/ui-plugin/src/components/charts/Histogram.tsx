import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useFilterStores } from './hooks/useFilterStores';
import {CHART, shopIdToNameMap } from "./charts.constants";
import { HistogramData } from './charts.types';
import { UserSettings } from '../settings/settings.types';
import {Typography} from "@mui/material";

type HistogramProps = {
  histogramData: HistogramData;
  userSettings: UserSettings;
};

const calculateBinSize = (data: number[]): number => {
  const n = data.length;
  const k = Math.ceil(Math.log2(n) + 1); // Sturges' rule
  const range = Math.max(...data) - Math.min(...data);
  return Math.ceil(range / k);
};

export const Histogram = ({ histogramData, userSettings }: HistogramProps) => {
  const filterStores = useFilterStores(userSettings);

  const allData = Object.values(histogramData).flat();
  const binSize = calculateBinSize(allData);
  const binCounts: Record<number, { bin: number; count: number }[]> = {};

  Object.entries(histogramData).forEach(([storeId, prices]) => {
    const counts: Record<number, number> = {};

    prices.forEach(price => {
      const bin = Math.floor(price / binSize) * binSize;
      counts[bin] = (counts[bin] || 0) + 1;
    });

    binCounts[parseInt(storeId)] = Object.entries(counts).map(([bin, count]) => ({
      bin: parseInt(bin),
      count,
    }));
  });

  return (
    <>
      <Typography fontWeight="bold" >{CHART.HISTOGRAM_HEADER}</Typography>
      {(userSettings.showAmazonData || userSettings.showIvoryData || userSettings.showKSPData) &&
      (<ResponsiveContainer width={'100%'} height={270}>
        <BarChart data={Object.entries(binCounts).flatMap(([storeId, bins]) =>
          bins.map(bin => ({
            bin: bin.bin,
            [`${shopIdToNameMap[storeId].storeName}`]: bin.count,
          }))
        ).sort((a, b) => a.bin - b.bin)}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            dataKey="bin"
            name="Price Range"
            tickFormatter={(value) => `$${value}`}
          >
            <Label offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis name="Price">
            <Label value="Weeks" angle={-90} position="insideLeft" offset={10} />
          </YAxis>
          <Tooltip/>
          <Legend  />
          {Object.entries(shopIdToNameMap).filter(([storeId]) =>
          filterStores(storeId)
          ).map(([storeId, storeData]) => (
                  <Bar
                    key={storeId}
                    dataKey={storeData.storeName}
                    name={storeData.storeName}
                    fill={storeData.lineColor}
                  />
                ))}
        </BarChart>
      </ResponsiveContainer>)}
    </>
  );
};
