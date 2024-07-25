import {useMainPage} from "./useMainPage";
import {MainPage} from "./MainPage";
import {Box, CircularProgress} from "@mui/material";

export const MainPageController = () => {
  const {isLoading,...mainPageProps} = useMainPage()
  return (
    isLoading
        ? <Box display="flex" minWidth={50} minHeight={50}><CircularProgress/></Box>
        : <MainPage {...mainPageProps}/>
  )
}
