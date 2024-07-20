import {UserSettings} from "../../components/settings/settings.types";
import {userSettingsKey} from "./localStorage.constants";
import {defaultSettings} from "../../components/settings/settings.constants";

export const saveToLocalStorage = ( value: UserSettings) => {
  localStorage.setItem(userSettingsKey, JSON.stringify(value));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem(userSettingsKey);
  return data ? JSON.parse(data) as UserSettings : defaultSettings;
};
