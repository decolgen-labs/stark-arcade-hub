import { RPC_PROVIDER } from "@/utils/constants";
import { mainnet } from "@starknet-react/chains";
import {
  InjectedConnector,
  StarknetConfig,
  jsonRpcProvider,
} from "@starknet-react/core";
import React, { PropsWithChildren } from "react";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  function rpc() {
    return {
      nodeUrl: RPC_PROVIDER.MAINET,
    };
  }

  const provider = jsonRpcProvider({ rpc });
  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new ArgentMobileConnector(),
  ];
  return (
    <>
      <StarknetConfig
        chains={[mainnet]}
        provider={provider}
        connectors={connectors}
      >
        {children}
      </StarknetConfig>
    </>
  );
};

export default ProviderStarknet;
