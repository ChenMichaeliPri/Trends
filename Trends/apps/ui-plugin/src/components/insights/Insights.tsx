import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownAltSharpIcon from '@mui/icons-material/ThumbDownAltSharp';

export type InsightsData={
  text:string;
  date:string;
  advice:boolean;
}

type InsightsProps={
  items:InsightsData[];
}

export const Insights = ({items}:InsightsProps) =>{
  return(
    <List sx={{ width: 300, height:185 ,overflowY:'scroll'}}>
      {items.map((item,index)=>(
        <ListItem key={index}>
          <ListItemIcon>
            {item.advice? <ThumbUpAltSharpIcon/> : <ThumbDownAltSharpIcon/> }
          </ListItemIcon>
          <ListItemText primary={item.text} secondary={item.date}/>
        </ListItem>
      ))}
    </List>
  )
}
