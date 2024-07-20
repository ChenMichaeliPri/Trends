import {ChartData, DataPoint, StoresData} from "./chart.types";

export const currentPriceMock = 1234;
export const minPriceMock = 1000;
export const maxPriceMock = 3000;
export const averagePriceMock= 2000;
export const standardDeviationMock=1000;
export const ivoryDataMock:DataPoint[] = [
  { date: '01-01-23', price: 120 },
  { date: '02-01-23', price: 119 },
  { date: '03-01-23', price: 118 },
  { date: '04-01-23', price: 117 },
  { date: '05-01-23', price: 116 },
  { date: '06-01-23', price: 115 },
  { date: '07-01-23', price: 114 },
  { date: '08-01-23', price: 113 },
  { date: '09-01-23', price: 112 },
  { date: '10-01-23', price: 110 },
  { date: '15-03-23', price: 200 }, // Peak
  { date: '16-03-23', price: 145 },
  { date: '17-03-23', price: 140 },
  { date: '18-03-23', price: 138 },
  { date: '19-03-23', price: 136 },
  { date: '20-03-23', price: 134 },
  { date: '01-06-23', price: 210 }, // Peak
  { date: '02-06-23', price: 155 },
  { date: '03-06-23', price: 150 },
  { date: '04-06-23', price: 148 },
  { date: '05-06-23', price: 146 },
  { date: '06-06-23', price: 144 },
  { date: '10-09-23', price: 200 }, // Peak
  { date: '11-09-23', price: 165 },
  { date: '12-09-23', price: 60 }, //Peak
  { date: '13-09-23', price: 158 },
  { date: '14-09-23', price: 156 },
  { date: '15-09-23', price: 154 },
  { date: '31-12-23', price: 130 },
];
export const amazonDataMock:DataPoint[] = [
  { date: '01-01-23', price: 220 },
  { date: '02-01-23', price: 219 },
  { date: '03-01-23', price: 218 },
  { date: '04-01-23', price: 217 },
  { date: '05-01-23', price: 216 },
  { date: '06-01-23', price: 215 },
  { date: '07-01-23', price: 214 },
  { date: '08-01-23', price: 213 },
  { date: '09-01-23', price: 212 },
  { date: '10-01-23', price: 210 },
  { date: '15-03-23', price: 300 }, // Peak
  { date: '16-03-23', price: 145 },
  { date: '17-03-23', price: 140 },
  { date: '18-03-23', price: 138 },
  { date: '19-03-23', price: 136 },
  { date: '20-03-23', price: 134 },
  { date: '01-06-23', price: 270 }, // Peak
  { date: '02-06-23', price: 255 },
  { date: '03-06-23', price: 250 },
  { date: '04-06-23', price: 248 },
  { date: '05-06-23', price: 246 },
  { date: '06-06-23', price: 244 },
  { date: '10-09-23', price: 200}, // Peak
  { date: '11-09-23', price: 165 },
  { date: '12-09-23', price: 60 }, //Peak
  { date: '13-09-23', price: 158 },
  { date: '14-09-23', price: 156 },
  { date: '15-09-23', price: 154 },
  { date: '31-12-23', price: 130 },
];
export const kspDataMock:DataPoint[] = [
  { date: '01-01-23', price: 320 },
  { date: '02-01-23', price: 319 },
  { date: '03-01-23', price: 318 },
  { date: '04-01-23', price: 317 },
  { date: '05-01-23', price: 316 },
  { date: '06-01-23', price: 315 },
  { date: '07-01-23', price: 314 },
  { date: '08-01-23', price: 313 },
  { date: '09-01-23', price: 312 },
  { date: '10-01-23', price: 310 },
  { date: '15-03-23', price: 400 }, // Peak
  { date: '16-03-23', price: 145 },
  { date: '17-03-23', price: 140 },
  { date: '18-03-23', price: 138 },
  { date: '19-03-23', price: 136 },
  { date: '20-03-23', price: 134 },
  { date: '01-06-23', price: 350 }, // Peak
  { date: '02-06-23', price: 155 },
  { date: '03-06-23', price: 150 },
  { date: '04-06-23', price: 148 },
  { date: '05-06-23', price: 146 },
  { date: '06-06-23', price: 144 },
  { date: '10-09-23', price: 200 }, // Peak
  { date: '11-09-23', price: 165 },
  { date: '12-09-23', price: 70 }, //Peak
  { date: '13-09-23', price: 158 },
  { date: '14-09-23', price: 116 },
  { date: '15-09-23', price: 154 },
  { date: '31-12-23', price: 130 },
];

export const storesDataMock : StoresData = {
  1:amazonDataMock,
  2:kspDataMock,
  3:ivoryDataMock
}

export const chartDataMock :ChartData ={
  currentPrice: currentPriceMock,
  minPrice:minPriceMock,
  maxPrice:maxPriceMock,
  averagePrice:averagePriceMock,
  standardDeviation:standardDeviationMock
}