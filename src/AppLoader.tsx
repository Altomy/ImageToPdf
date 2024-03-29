/** AppLoader.tsx */

// ========== Imports ========== //
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
// ========== propsTypes ========== //
export type propsTypes = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

/** MainFunction */
let AppLoader: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */
  let FinishLoading = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  let Builder = async () => {
    FinishLoading();
  };

  React.useEffect(() => {
    Builder();
  }, []);

  // ==== RETURN METHOD ==== //
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={require("views/Home/Home").default}
        />
        <Stack.Screen
          name="Preview"
          component={require("views/Preview/Preview").default}
        />
        <Stack.Screen
          name="Languages"
          component={require("views/Languages/Languages").default}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="AboutUs"
          component={require("views/AboutUs/AboutUs").default}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="CallUs"
          component={require("views/CallUs/CallUs").default}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppLoader;
