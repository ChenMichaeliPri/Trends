import {useState} from "react";
import {UserSettings} from "./settings.types";
import {useLocalStorage} from "../../utils/localStorage/LocalStorageProvider";
import {defaultSettings} from "./settings.constants";

export const useSettings = () => {
  const [isSettingsOpen , setIsSettingsOpen] = useState(false);
  const { data, setData } = useLocalStorage();
  const [formState,setFormState] = useState<UserSettings>(data)

  return{
    openSettings: () => setIsSettingsOpen(true),
    isSettingsOpen,
    handleClose: () =>  setIsSettingsOpen(false),
    formState,
    handleChange: (field:string,value:boolean) =>{
      const nextState = {
        ...formState,
        [field]:value
      }
      setFormState(nextState);
      setData(nextState);
    },
    handleReset:()=>{
      setFormState(defaultSettings);
      setData(defaultSettings);
    }
  }

}
