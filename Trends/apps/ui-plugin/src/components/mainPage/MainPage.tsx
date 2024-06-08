import { Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";

import {Chart} from "../chart/Chart";
import {useChart} from "../chart/useChart";
import {useInsights} from "../insights/useInsights";
import {Insights} from "../insights/Insights";

export type MainPageProps = {
  productName:string;
  showChart:boolean;
  onClick:()=>void;
}
export const MainPage= ({productName,showChart,onClick}:MainPageProps) => {
  const chartData = useChart();
  const insightsData = useInsights();
  return (
    <Card raised sx={{}} >
      <CardHeader
        title="Price Trends Plug-in"
        subheader={`Showing data for ${productName}`}
      />
      <CardContent>
        {showChart
          ? <Chart data={chartData}/>
          : <Insights items={insightsData}/>
        }
      </CardContent>
      <CardActions>
        <Button size='small' onClick={onClick}> {`Show ${showChart? 'Insights' : 'Chart'}`}</Button>
      </CardActions>
    </Card>
  );
}
