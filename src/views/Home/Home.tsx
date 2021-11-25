/** Home.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Box,
  Text,
  Image,
  ScrollView,
  Pressable,
  Icon,
  Circle,
} from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import MainHeader from "components/MainHeader";
import useToggle from "hooks/useToggle";
import BottomSheet from "components/BottomSheet";
import Options from "./components/Options";
import AnimatedFixBox from "components/AnimatedFixBox";
import SidePanel from "./components/SidePanel";
import PickImage from "components/PickImage";
import { usePdf } from "context/PdfProvider";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "native-base";
import useAds from "hooks/useAds";
import { useAuth } from "context/AuthProvider";
import useAnalytics from "hooks/useAnalytics";
import { AdMobBanner } from "expo-ads-admob";
import ads from "utils/ads";
import { useTranslation } from "react-i18next";
import { isDev } from "utils/env";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

/** MainFunction */
let Home: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { width, height } = useWindowDimensions();
  let [showBottom, toggleShow] = useToggle();
  let [showSideBar, toggleSideBar] = useToggle();
  let [showImageBag, toggleShowImageBag] = useToggle(true);
  let toast = useToast();

  let { pushToImageBag, Pdf, removeFromImageBag, dispatchPdf } = usePdf();
  let { imageBag } = Pdf;
  let { dispatchAuth, Auth } = useAuth();
  let { enableAnalytics } = useAnalytics();

  let { t } = useTranslation("translation", { keyPrefix: "home" });

  /** @kind: Methods */

  let { requestTrackingPermission } = useAds();

  /** @kind: Views */

  let requestPermission = async () => {
    let status = await requestTrackingPermission();
    dispatchAuth({
      type: "setUserAction",
      payload: status,
    });
    await enableAnalytics();
  };

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        boxStyle={{ bgColor: "red.400" }}
        title={t`title`}
        titleStyle={{ color: "black" }}
        menu="right"
        onPressMenu={() => {
          toggleSideBar();
        }}
      />
      <Box
        flex={1}
        bgColor={"red.200"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          m={2}
          width="75%"
          p={3}
          borderColor={"black"}
          borderWidth={2}
          borderStyle={"dashed"}
          alignItems={"center"}
          borderRadius={3}
          justifyContent={"center"}
        >
          <PickImage
            holderType="custom"
            onFinish={(image) => {
              pushToImageBag(image);
            }}
          >
            <Image
              source={require("../../components/defaultPlaceHolder.png")}
              width={width / 4}
              height={height / 6}
              resizeMode="cover"
              alt="Place holder"
            />
            <Text textAlign={"center"} fontSize={"sm"}>
              {t`selectImage`}
            </Text>
          </PickImage>
        </Box>
        {imageBag.length !== 0 && (
          <Box
            width="95%"
            shadow={1}
            p={1}
            mt={4}
            borderRadius={3}
            bgColor={"red.100"}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {imageBag.map((image, index) => (
                <Box key={index}>
                  <Image
                    source={{ uri: image.uri }}
                    width={width / 3}
                    height={height / 5}
                    mx={1}
                    borderRadius={3}
                    resizeMode="stretch"
                    alt="Place holder"
                  />
                  <Box
                    position={"absolute"}
                    left={1.5}
                    top={1}
                    borderRadius={30}
                    height={12}
                    bgColor={"black"}
                  >
                    <Circle bgColor={"muted.200"}>
                      <Icon
                        onPress={() => {
                          removeFromImageBag(index);
                        }}
                        as={<Ionicons name="close-outline" />}
                        color="red.500"
                        size={6}
                      />
                    </Circle>
                  </Box>
                </Box>
              ))}
            </ScrollView>
          </Box>
        )}
        <Box height={2}></Box>
        {!isDev && (
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID={ads.basic}
            servePersonalizedAds={Auth.userAds}
          ></AdMobBanner>
        )}
      </Box>
      <Box
        position={"absolute"}
        left={0}
        bottom={0}
        width="100%"
        style={{ elevation: 3, zIndex: 101 }}
      >
        <Box
          alignItems={"center"}
          flexDir={"row"}
          height={height / 14}
          width="100%"
        >
          <Pressable
            flex={3}
            height="100%"
            bgColor={"red.400"}
            alignItems={"center"}
            shadow={3}
            justifyContent={"center"}
            onPress={async () => {
              if (imageBag.length === 0) {
                toast.show({
                  title: "Please add at lease one image",
                  status: "error",
                });
                return;
              }
              await requestPermission();
              props.navigation.navigate("Preview");
            }}
          >
            <Text>{t`createPdf`}</Text>
          </Pressable>
          <Pressable
            flex={1}
            shadow={3}
            bgColor={"black"}
            height="100%"
            alignItems={"center"}
            justifyContent={"center"}
            onPress={() => {
              toggleShow();
            }}
          >
            <Text color="white">{t`options`}</Text>
          </Pressable>
        </Box>
      </Box>
      {showBottom && (
        <BottomSheet
          headerTitle="Options"
          onClose={() => {
            toggleShow();
          }}
        >
          <Box
            height={height / 1.2}
            width="100%"
            style={{ elevation: 4, zIndex: 101 }}
          >
            <Options
              onSave={() => {
                toggleShow();
              }}
            />
          </Box>
        </BottomSheet>
      )}

      {showSideBar && (
        <AnimatedFixBox
          onClose={() => {
            toggleSideBar();
          }}
        >
          <SidePanel />
        </AnimatedFixBox>
      )}
    </Box>
  );
};

export default Home;
