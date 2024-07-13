import {Button, Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Chart} from "../chart/Chart";
import {useChart} from "../chart/useChart";
import {useInsights} from "../insights/useInsights";
import {Insights} from "../insights/Insights";
import {Settings} from "../settings/Settings"
import {MAIN_PAGE} from "./mainPage.constants";
import {useSettings} from "../settings/useSettings";

export type MainPageProps = {
  productName:string;
  showTrends:boolean;
  onClick:()=>void;
}

export const MainPage= ({productName,showTrends,onClick}:MainPageProps) => {
  const chartProps = useChart();
  const insightsData = useInsights();
  const {openSettings , ...settingProps} = useSettings();
  return (
    <>
      <Card>
        <CardHeader
          title={MAIN_PAGE.TITLE_TEXT}
          subheader={MAIN_PAGE.SUBHEADER_TEXT.replace('{productName}',productName)}
          action={
            <IconButton onClick={openSettings} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent sx={{paddingTop:0 , width:400 , height:250 ,}}>
          {showTrends
            ? <Chart {...chartProps}/>
            : <Insights insight={insightsData}/>
          }
        </CardContent>
        <CardActions>
          <Button size='small' onClick={onClick}> {showTrends? MAIN_PAGE.INSIGHTS_BUTTON_TEXT: MAIN_PAGE.TRENDS_BUTTON_TEXT}</Button>
        </CardActions>
      </Card>
      <Settings {...settingProps}/>
    </>
  );
}
