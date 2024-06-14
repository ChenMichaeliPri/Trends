import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownAltSharpIcon from '@mui/icons-material/ThumbDownAltSharp';
import {InsightsData} from "./insights.types";

type InsightsProps={
  items:InsightsData[];
}

export const Insights = ({items}:InsightsProps) =>{
  return(
    <List sx={{ width: 300, height:185 ,overflowY:'scroll'}}>
      {items.map(({id,shouldPurchase,date,text})=>(
        <ListItem key={id}>
          <ListItemIcon>
            {shouldPurchase? <ThumbUpAltSharpIcon/> : <ThumbDownAltSharpIcon/> }
          </ListItemIcon>
          <ListItemText primary={text} secondary={date}/>
        </ListItem>
      ))}
    </List>
  )
}
