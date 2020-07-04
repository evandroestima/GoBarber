import React from "react";
import GlobalStyle from "./styles/global";
import Routes from "./routes";
import AppProvider from "./hooks/index";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <div>
          <Routes />
        </div>
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
