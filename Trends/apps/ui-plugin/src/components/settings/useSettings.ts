import {useState} from "react";
import {UserSettings} from "./settings.types";
import {useLocalStorage} from "../../utils/localStorage/LocalStorageProvider";

export const useSettings = () => {
  const { data, setData } = useLocalStorage();
  const [isSettingsOpen , setIsSettingsOpen] = useState(false);
  const [formState,setFormState] = useState<UserSettings>(data)
  const handleClose = () => setIsSettingsOpen(false)
  return{
    openSettings: () => setIsSettingsOpen(true),
    isSettingsOpen,
    handleClose,
    formState,
    handleChange: (field:string,value:boolean) =>{
      setFormState((prevState)=>({
        ...prevState,
        [field]:value
      }))
    },
    handleSave:()=> {
      setData(formState);
      handleClose();
    }
  }

}
