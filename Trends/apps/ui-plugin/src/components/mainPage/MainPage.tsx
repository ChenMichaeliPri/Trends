import {Button, Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ComponentProps} from "react";

import {Chart} from "../chart/Chart";
import {Insights} from "../insights/Insights";
import {Settings} from "../settings/Settings"
import {MAIN_PAGE} from "./mainPage.constants";
import {UserSettings} from "../settings/settings.types";
import {ChartData, StoresData} from "../chart/chart.types";

export type MainPageProps = {
  productName:string;
  showTrends:boolean;
  insights:string;
  chartData:ChartData;
  storesData:StoresData
  onClick:()=>void;
  openSettings:()=>void;
  userSettings:UserSettings;
  settingsProps:ComponentProps<typeof Settings>
}

export const MainPage= ({productName,showTrends,onClick,insights,chartData,storesData,openSettings,userSettings,settingsProps}:MainPageProps) => {
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
            ? <Chart chartData={chartData} storesData={storesData} userSettings={userSettings}/>
            : <Insights insight={insights}/>
          }
        </CardContent>
        <CardActions>
          <Button size='small' onClick={onClick}> {showTrends? MAIN_PAGE.INSIGHTS_BUTTON_TEXT: MAIN_PAGE.TRENDS_BUTTON_TEXT}</Button>
        </CardActions>
      </Card>
      <Settings {...settingsProps} />
    </>
  );
}
