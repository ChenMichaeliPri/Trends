import { Typography } from "@mui/material";

type InsightsProps={
  insight:string
}

export const Insights = ({insight}:InsightsProps) =>{
  return(
    <Typography whiteSpace={'pre-line'} >
      {insight}
    </Typography>
  )
}
