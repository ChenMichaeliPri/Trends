import {useMainPage} from "./useMainPage";
import {MainPage} from "./MainPage";

export const MainPageController = () => {
  const mainPageProps = useMainPage()
  return (
    <MainPage {...mainPageProps}/>
  )
}
