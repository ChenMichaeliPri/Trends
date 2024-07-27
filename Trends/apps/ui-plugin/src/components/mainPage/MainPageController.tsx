import {useMainPage} from "./useMainPage";
import {MainPage} from "./MainPage";
import {Alert, AlertTitle, Box, CircularProgress} from "@mui/material";
import {MAIN_PAGE} from "./mainPage.constants";

export const MainPageController = () => {
  const {isLoading, isError,...mainPageProps} = useMainPage()
  if (isLoading) return (<Box display="flex" minWidth={50} minHeight={50}><CircularProgress/></Box>)
  if (isError) return (
    <Box width={'350px'}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {MAIN_PAGE.ERROR_TEXT}
      </Alert>
    </Box>
  )
  return <MainPage {...mainPageProps}/>
}
