import {Box} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

import {MainPageController} from "./mainPage/MainPageController";
import {useLocalStorage} from "../utils/localStorage/LocalStorageProvider";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient())
    const {data} = useLocalStorage();
  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{display:'flex' ,height:'100%',width:'100%'}}>
        <MainPageController/>
      </Box>
    </QueryClientProvider>
  );
}

