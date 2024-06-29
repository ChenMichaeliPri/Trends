import {Box} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

import {MainPageController} from "./mainPage/MainPageController";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{display:'flex' }}>
        <MainPageController/>
      </Box>
    </QueryClientProvider>
  );
}

