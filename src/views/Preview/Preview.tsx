/** Preview.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Box, HStack, Pressable, Text } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import html, {
  imageHolder,
  imageHolderWithoutSlice,
  pageWithoutSlice,
} from "assets/html/default";
import useWebViews from "hooks/UseWebView/useWebViews";
import { usePdf } from "context/PdfProvider";
import * as FileSystem from "expo-file-system";
import useAds from "hooks/useAds";
import ads from "utils/ads";
import { useAuth } from "context/AuthProvider";
import { useTranslation } from "react-i18next";
import { isDev } from "utils/env";
// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Preview">;
};

/** MainFunction */
let Preview: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  let { Pdf } = usePdf();
  let { generatePDF } = useWebViews();
  let { imageBag, options } = Pdf;

  let { t } = useTranslation("translation", { keyPrefix: "result" });

  let { imageSizeType, imagePadding } = options;

  let [htm, setHtm] = useState("");
  let values = async () => {
    let base = html;

    let looping: () => Promise<string> = async () => {
      let _toPlaceInImageHolder = ``;

      // Get the page Holder => has {imageHolder}

      // Set image to replace in page;
      // set the imageNumber
      for (const imageB of imageBag) {
        let _uri = imageB.uri;
        let base64 = await FileSystem.readAsStringAsync(_uri, {
          encoding: "base64",
        });
        base64 = `data:image/jpeg;base64, ${base64}`;
        // Get the image for here

        // set the image holder;
        let _holder =
          options.imageType === "slice" ? imageHolder : imageHolderWithoutSlice;

        if (imageSizeType === "fixed") {
          _holder = _holder.replace("{imgH}", `height="60%"`);
        } else if (imageSizeType === "fullPage") {
          _holder = _holder.replace("{imgH}", `height="100%"`);
        } else {
          _holder = _holder.replace("{imgH}", `height="60%"`);
        }

        let padding = `style="padding:${imagePadding.top}px ${imagePadding.right}px ${imagePadding.bottom}px ${imagePadding.left}px;height:100%;"`;
        _holder = _holder.replace("{paddingS}", padding);

        _holder = _holder.replace("{image}", base64);
        _toPlaceInImageHolder = `${_toPlaceInImageHolder}
        ${_holder}`;
      }

      return _toPlaceInImageHolder;
    };

    // Loop the images

    let _imagesHolder = await looping();

    if (options.imageType === "without") {
      _imagesHolder = pageWithoutSlice.replace("{children}", _imagesHolder);
    }

    base = base.replace("{imageHolder}", _imagesHolder);

    setHtm(base);
  };

  let { showInterstitial } = useAds();

  let { Auth } = useAuth();

  let createAds = async () => {
    if (!isDev) {
      await showInterstitial(ads.generateCV as string, Auth.userAds);
    }
  };

  useEffect(() => {
    values();
    createAds();
  }, []);

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        back="none"
        boxStyle={{ bgColor: "red.400" }}
        onPressBack={() => {
          props.navigation.goBack();
        }}
        title={t`preview`}
        titleStyle={{ fontSize: "sm", textAlign: "center" }}
      ></MainHeader>
      <Box flex={1}>
        <WebView style={{ flex: 1 }} source={{ html: htm }}></WebView>
      </Box>
      <Box>
        <HStack>
          <Pressable
            height={51}
            bgColor={"red.400"}
            flex={3}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={() => {
              generatePDF(htm);
            }}
          >
            <Text color="white">{t`save`}</Text>
          </Pressable>
          <Pressable
            height={51}
            bgColor={"black"}
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={() => {
              generatePDF(htm);
            }}
          >
            <Text color="white">{t`share`}</Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
};

export default Preview;
