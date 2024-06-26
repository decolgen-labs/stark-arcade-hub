"use client";
import React, { PropsWithChildren } from "react";
import ProviderChakra from "./ProviderChakra";
import ProviderStarknet from "./ProviderStarknet";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProviderStarknet>{children}</ProviderStarknet>
        </PersistGate>
      </Provider>
    </ProviderChakra>
  );
};

export default ProviderApp;
