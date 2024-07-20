import {useMainPage} from "./useMainPage";
import {MainPage} from "./MainPage";
import {CircularProgress} from "@mui/material";

export const MainPageController = () => {
  const {isLoading,...mainPageProps} = useMainPage()
  return (
    isLoading
    ? <CircularProgress/>
    : <MainPage {...mainPageProps}/>
  )
}
