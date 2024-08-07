import { useAuth } from '@/hooks/useAuth';

import { Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import React from 'react';
import { useStarknetkitConnectModal } from 'starknetkit';
import WalletIcon from '@/public/assets/icons/wallet.svg';
import { Connector } from 'starknetkit'; // Import the Connector type from the starknetkit package
interface IProps {
  sx?: ButtonProps;
}
const ConnectWallet = ({ sx }: IProps) => {
  const { connectors } = useConnect();
  const { connectWallet } = useAuth();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as Connector[],
  });

  const handleConnectWallet = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks

      const { connector } = await starknetkitConnectModal();
      const connectorIndex = connectors.findIndex(
        c => c.name === connector.name
      );
      await connectWallet(connectorIndex);
    } catch (error) {}
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  return (
    <Button
      cursor="pointer"
      variant="primary"
      onClick={handleConnectWallet}
      {...sx}
      as={HStack}
    >
      <Icon as={WalletIcon} h={6} w={6} />
      <Text
        display={{
          md: 'block',
          base: 'none',
        }}
      >
        Connect to wallet
      </Text>
    </Button>
  );
};

export default ConnectWallet;
