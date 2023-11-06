import { useContext } from "react";
import { SettingsContext } from "../providers/SettingsProvider";

const useSettings = () => {
  return useContext(SettingsContext);
};
export default useSettings;
