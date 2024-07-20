import React, {createContext, useContext, useState, useEffect, PropsWithChildren} from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.services';
import {UserSettings} from "../../components/settings/settings.types";

interface LocalStorageContextProps {
  data: UserSettings;
  setData: (data: UserSettings) => void;
}

const LocalStorageContext = createContext<LocalStorageContextProps | undefined>(undefined);

export const LocalStorageProvider = ({ children }:PropsWithChildren) => {
  const [data, setData] = useState(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage( data);
  }, [data]);

  return (
    <LocalStorageContext.Provider value={{ data, setData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider');
  }
  return context;
};

