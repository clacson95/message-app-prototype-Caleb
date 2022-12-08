import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/chatProvider";

// Wrapping the entire app in ChatProvider,
// ChakraProvider,
// and BrowserRouter so that these imports are accessible throughout the entire application

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </ChatProvider>
);
