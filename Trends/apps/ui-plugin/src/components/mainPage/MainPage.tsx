import { Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";

import {Chart} from "../chart/Chart";
import {useChart} from "../chart/useChart";
import {useInsights} from "../insights/useInsights";
import {Insights} from "../insights/Insights";
import {MAIN_PAGE} from "./mainPage.constants";

export type MainPageProps = {
  productName:string;
  showTrends:boolean;
  onClick:()=>void;
}
export const MainPage= ({productName,showTrends,onClick}:MainPageProps) => {
  const chartData = useChart();
  const insightsData = useInsights();
  return (
    <Card raised sx={{}} >
      <CardHeader
        title={MAIN_PAGE.TITLE_TEXT}
        subheader={MAIN_PAGE.SUBHEADER_TEXT.replace('{productName}',productName)}
      />
      <CardContent>
        {showTrends
          ? <Chart data={chartData}/>
          : <Insights items={insightsData}/>
        }
      </CardContent>
      <CardActions>
        <Button size='small' onClick={onClick}> {showTrends? MAIN_PAGE.INSIGHTS_BUTTON_TEXT: MAIN_PAGE.TRENDS_BUTTON_TEXT}</Button>
      </CardActions>
    </Card>
  );
}
