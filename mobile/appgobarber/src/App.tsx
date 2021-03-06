import "react-native-gesture-handler";

import React from "react";
import { SafeAreaView, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./hooks";
import Routes from "./routes/index";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <AppProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#312e38" }}>
          <Routes />
        </SafeAreaView>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
