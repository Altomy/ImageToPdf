/** SidePanel.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { Box, Icon, Text } from "native-base";
import ListedMenu from "components/ListedMenu";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let SidePanel: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { width, height } = useWindowDimensions();

  let { t, i18n } = useTranslation("translation", {
    keyPrefix: "home.sidePanel",
  });

  /** @kind: Methods */
  let navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box height={height} width={width}>
      <Box bgColor="white" mt={16} width={"65%"}>
        <Text bold m={1}>
          {t`settings`}
        </Text>
        <Box p={3}>
          <ListedMenu
            listBoxStyles={{ py: 1.5, borderBottomColor: "muted.400" }}
            titleStyles={{ color: "muted.600" }}
            lists={[
              {
                title: t`language`,
                icon: (
                  <Icon
                    as={<Ionicons name="language-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                leftElement: (
                  <Text bold fontSize={"xs"}>
                    {i18n.language}
                  </Text>
                ),
                onPress: () => {
                  navigation.navigate("Languages");
                },
              },
              {
                title: t`aboutUs`,
                icon: (
                  <Icon
                    as={<Ionicons name="information-circle-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("AboutUs");
                },
              },
              {
                title: t`callUs`,
                icon: (
                  <Icon
                    as={<Ionicons name="chatbox-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("CallUs");
                },
              },
            ]}
          ></ListedMenu>
        </Box>
      </Box>
    </Box>
  );
};

export default SidePanel;
