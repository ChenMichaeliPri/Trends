import {ChartData} from "./chart.types";

export const chartDataMock:ChartData[] = [
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
  { date: '15-03-23', price: 200, avoidDate:true }, // Peak
  { date: '16-03-23', price: 145 },
  { date: '17-03-23', price: 140 },
  { date: '18-03-23', price: 138 },
  { date: '19-03-23', price: 136 },
  { date: '20-03-23', price: 134 },
  { date: '01-06-23', price: 210, avoidDate:true}, // Peak
  { date: '02-06-23', price: 155 },
  { date: '03-06-23', price: 150 },
  { date: '04-06-23', price: 148 },
  { date: '05-06-23', price: 146 },
  { date: '06-06-23', price: 144 },
  { date: '10-09-23', price: 200, avoidDate:true}, // Peak
  { date: '11-09-23', price: 165 },
  { date: '12-09-23', price: 60 , recommendedDate:true}, //Peak
  { date: '13-09-23', price: 158 },
  { date: '14-09-23', price: 156 },
  { date: '15-09-23', price: 154 },
  { date: '31-12-23', price: 130 },
];
