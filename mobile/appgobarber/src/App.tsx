import "react-native-gesture-handler";

import React from "react";
import { SafeAreaView, Text, StatusBar } from "react-native";

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#312e38" }} />
    </>
  );
};

export default App;
