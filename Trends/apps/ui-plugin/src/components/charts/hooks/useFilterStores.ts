import { UserSettings } from "../../settings/settings.types";

export const useFilterStores = (userSettings: UserSettings)=> {
    const {
        showAmazonData,
        showIvoryData,
        showKSPData
      } = userSettings;

    return (storeId: string) => {
        switch (storeId) {
            case '1': return showAmazonData;
            case '2': return showKSPData;
            case '3': return showIvoryData;
            default: return false;
    }}
  }
