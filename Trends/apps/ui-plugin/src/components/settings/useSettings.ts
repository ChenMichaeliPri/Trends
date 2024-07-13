import {useState} from "react";
import {UserSettings} from "./settings.types";
import {defaultSettings} from "./settings.constants";

export const useSettings = () => {
  const [isSettingsOpen , setIsSettingsOpen] = useState(false);
  const [formState,setFormState] = useState<UserSettings>(defaultSettings)
  return{
    openSettings: () => setIsSettingsOpen(true),
    isSettingsOpen,
    handleClose: () => setIsSettingsOpen(false),
    formState,
    handleChange: (field:string,value:boolean) =>{
      setFormState((prevState)=>({
        ...prevState,
        [field]:value
      }))
    }
  }

}
