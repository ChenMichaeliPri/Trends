import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ComponentProps, ReactElement} from "react";

import {Chart} from "../chart/Chart";
import {Settings} from "../settings/Settings"
import {MAIN_PAGE} from "./mainPage.constants";
import {UserSettings} from "../settings/settings.types";
import {ChartData, StoresData} from "../chart/chart.types";
import { CurrentComponent } from "./mainPage.types";
import {CHART} from "../chart/chart.constants";

export type MainPageProps = {
  productName:string;
  currentComponent:CurrentComponent;
  setCurrentComponent: React.Dispatch<React.SetStateAction<CurrentComponent>>;
  insights:string;
  chartData:ChartData;
  storesData:StoresData
  openSettings:()=>void;
  userSettings:UserSettings;
  settingsProps:ComponentProps<typeof Settings>
}

export const MainPage= ({productName,currentComponent,setCurrentComponent,insights,chartData,storesData,openSettings,userSettings,settingsProps}:MainPageProps) => {
  const {
    showMinPrice,
    showMaxPrice,
    showAveragePrice,
    showStandardDeviation
  } = userSettings;

  const {
    minPrice,
    maxPrice,
    averagePrice,
    standardDeviation
  } = chartData;

  const CURRENT_COMPONENT_MAP :Record<CurrentComponent,ReactElement>  ={
    graph:<Chart storesData={storesData} userSettings={userSettings}/>,
    insights: (
      <Typography whiteSpace={'pre-line'} fontSize={20}>
        {insights}
      </Typography>
    ),
    histogram:<></>
  }

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{fontWeight:'bold'}}
          title={MAIN_PAGE.TITLE_TEXT}
          subheader={MAIN_PAGE.SUBHEADER_TEXT.replace('{productName}',productName)}
          action={
            <IconButton onClick={openSettings} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent sx={{paddingTop:0 , width:750 , height:400 }}>
          <Grid container spacing={1}>
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
            <Grid item xs={12} sx={{marginTop:1,marginBottom:1}}>
              <Divider sx={{borderWidth:1}}/>
            </Grid>
            <Grid item xs={12}>
              {CURRENT_COMPONENT_MAP[currentComponent]}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{justifyContent:'space-between'}}>
          <Button size='small' onClick={()=>setCurrentComponent('insights')} disabled={currentComponent === 'insights'}> {MAIN_PAGE.INSIGHTS_BUTTON_TEXT}</Button>
          <Button size='small' onClick={()=>setCurrentComponent('graph')} disabled={currentComponent === 'graph'}> {MAIN_PAGE.TRENDS_BUTTON_TEXT}</Button>
          <Button size='small' onClick={()=>setCurrentComponent('histogram')} disabled={currentComponent === 'histogram'} > {MAIN_PAGE.HISTOGRAM_BUTTON_TEXT}</Button>
        </CardActions>
      </Card>
      <Settings {...settingsProps} />
    </>
  );
}
