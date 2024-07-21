import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
  ThemeProvider,
  CssBaseline
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ComponentProps, ReactElement} from "react";

import {Chart} from "../chart/LineChart";
import { Histogram } from "../chart/Histogram";
import {Settings} from "../settings/Settings"
import {MAIN_PAGE} from "./mainPage.constants";
import {UserSettings} from "../settings/settings.types";
import {ChartData, StoresData, HistogramData} from "../chart/chart.types";
import { CurrentComponent } from "./mainPage.types";
import {CHART} from "../chart/chart.constants";
import { getTheme } from "../../theme";

export type MainPageProps = {
  productName:string;
  currentComponent:CurrentComponent;
  setCurrentComponent: React.Dispatch<React.SetStateAction<CurrentComponent>>;
  insights:string;
  chartData:ChartData;
  storesData:StoresData
  histogramData:HistogramData;
  openSettings:()=>void;
  userSettings:UserSettings;
  settingsProps:ComponentProps<typeof Settings>
}

export const MainPage= ({productName,currentComponent,setCurrentComponent,insights,chartData,storesData,histogramData,openSettings,userSettings,settingsProps}:MainPageProps) => {
  const theme = getTheme(userSettings.inDarkMode);
  const {
    showCurrentPrice,
    showMinPrice,
    showMaxPrice,
    showAveragePrice,
    showStandardDeviation
  } = userSettings;

  const {
    currentPrice,
    minPrice,
    maxPrice,
    averagePrice,
    standardDeviation
  } = chartData;

  const CURRENT_COMPONENT_MAP :Record<CurrentComponent,ReactElement>  ={
    graph:<Chart storesData={storesData} userSettings={userSettings}/>,
    insights: (
      <Typography whiteSpace={'pre-line'} >
        {insights}
      </Typography>
    ),
    histogram:<Histogram histogramData={histogramData} userSettings={userSettings}/>
  }

  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card >
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
        <CardContent sx={{ paddingTop: 0, width: 700, height: 400}}>
        <Grid container spacing={1}>
            {showCurrentPrice && <Grid item xs={6}>
              <Typography>{CHART.CURRENT_PRICE_TEXT.replace('{currentPrice}', currentPrice?.toString())}</Typography>
            </Grid>}
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
            <Grid item xs={12}>
              <Divider/>
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
      </ThemeProvider>
  );
}