import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, FormControlLabel, FormGroup, Grid, Switch, Typography
} from "@mui/material";
import {UserSettings} from "./settings.types";

type SettingsProps ={
  isSettingsOpen:boolean,
  handleClose: ()=>void,
  formState:UserSettings,
  handleChange:(field:string,value:boolean)=>void
}
export const Settings = ({isSettingsOpen , handleClose,formState,handleChange}:SettingsProps) =>{
  return(
    <Dialog open={isSettingsOpen} onClose={handleClose} fullWidth>
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <FormControl >
          <FormGroup>
            <Grid container >
              <Grid item xs={12}>
                <Typography> General Settings</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.inDarkMode} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="inDarkMode" />
                  }
                  label="Use Dark Mode"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography> Prices </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showMinPrice} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showMinPrice" />
                  }
                  label="Show Min"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showMaxPrice} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showMaxPrice" />
                  }
                  label="Show Max"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showAveragePrice} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showAveragePrice" />
                  }
                  label="Show Average"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showStandardDeviation} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showStandardDeviation" />
                  }
                  label="Show STD"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography> Stores Data </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showAmazonData} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showAmazonData" />
                  }
                  label="Show Amazon"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showKSPData} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showKSPData" />
                  }
                  label="Show KSP"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch checked={formState.showIvoryData} onChange={(e, checked)=>handleChange(e.target.name,checked)} name="showIvoryData" />
                  }
                  label="Show Ivory"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
    );

}
