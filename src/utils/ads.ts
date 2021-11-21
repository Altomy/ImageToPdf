import { Platform } from "react-native";
import { isDev } from "./env";

let banner = {
  production: Platform.select({
    ios: "ca-app-pub-8749426160957410/4229825447",
    android: "ca-app-pub-8749426160957410/7211212005",
  }),
  dev: "ca-app-pub-3940256099942544/6300978111",
};

let generatePDF = {
  production: Platform.select({
    ios: "ca-app-pub-8749426160957410/6926279151",
    android: "ca-app-pub-8749426160957410/5357745295",
  }),
  dev: "ca-app-pub-3940256099942544/1033173712",
};

let ads = {
  basic: isDev ? banner.dev : banner.production,
  generateCV: isDev ? generatePDF.dev : generatePDF.production,
};

export default ads;
