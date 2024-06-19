import { useAuth } from "@/hooks/useAuth";

import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { useConnect } from "@starknet-react/core";
import React from "react";
import { useStarknetkitConnectModal } from "starknetkit";
import WalletIcon from "@/public/assets/icons/wallet.svg";
import { Connector } from "starknetkit"; // Import the Connector type from the starknetkit package
interface IProps {
  sx?: ButtonProps;
}
const ConnectWallet = ({ sx }: IProps) => {
  const { connectors } = useConnect();
  const { connectWallet } = useAuth();
  const handleConnectWallet = async () => {
    try {
      const { starknetkitConnectModal } = useStarknetkitConnectModal({
        connectors: connectors as Connector[], // Cast the connectors array to Connector[]
      });

      const { connector } = await starknetkitConnectModal();
      const connectorIndex = connectors.findIndex(
        (c) => c.name === connector.name
      );
      await connectWallet(connectorIndex);
    } catch (error) {}
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  return (
    <Button
      variant="primary"
      onClick={handleConnectWallet}
      {...sx}
      leftIcon={<Icon as={WalletIcon} h={6} w={6} />}
    >
      Connect to wallet
    </Button>
  );
};

export default ConnectWallet;
