import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import { UserSettings } from './settings.types';
import { SETTINGS } from './settings.constants';

type SettingsProps = {
  isSettingsOpen: boolean;
  handleClose: () => void;
  formState: UserSettings;
  handleChange: (field: string, value: boolean) => void;
  handleReset: () => void;
};

export const Settings = ({
  isSettingsOpen,
  handleClose,
  formState,
  handleChange,
  handleReset,
}: SettingsProps) => {
  return (
    <Dialog open={isSettingsOpen} onClose={handleClose} fullWidth>
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormGroup>
            <Grid container>
              <Grid item xs={12}>
                <Typography>{SETTINGS.GENERAL_SETTINGS}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.inDarkMode}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="inDarkMode"
                    />
                  }
                  label={SETTINGS.USE_DARK_MODE}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{SETTINGS.PRICES}</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showCurrentPrice}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showCurrentPrice"
                    />
                  }
                  label={SETTINGS.SHOW_CURRENT}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showMinPrice}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showMinPrice"
                    />
                  }
                  label={SETTINGS.SHOW_MIN}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showMaxPrice}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showMaxPrice"
                    />
                  }
                  label={SETTINGS.SHOW_MAX}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showAveragePrice}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showAveragePrice"
                    />
                  }
                  label={SETTINGS.SHOW_AVERAGE}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showStandardDeviation}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showStandardDeviation"
                    />
                  }
                  label={SETTINGS.SHOW_STD}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{SETTINGS.STORES_DATA}</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showAmazonData}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showAmazonData"
                    />
                  }
                  label={SETTINGS.SHOW_AMAZON}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showKSPData}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showKSPData"
                    />
                  }
                  label={SETTINGS.SHOW_KSP}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formState.showIvoryData}
                      onChange={(e, checked) =>
                        handleChange(e.target.name, checked)
                      }
                      name="showIvoryData"
                    />
                  }
                  label={SETTINGS.SHOW_IVORY}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handleReset}>{SETTINGS.RESET}</Button>
        <Button onClick={handleClose}>{SETTINGS.CLOSE}</Button>
      </DialogActions>
    </Dialog>
  );
};
