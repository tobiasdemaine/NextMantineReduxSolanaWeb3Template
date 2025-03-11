'use client';

// App.tsx
import { useAppKit } from '@reown/appkit/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button, Container, Stack, Title } from '@mantine/core';

export default function App() {
  return <AppHome />;
}

export function AppHome() {
  const { open } = useAppKit();
  const { publicKey, connected } = useWallet();

  return (
    <Container size="lg" style={{ minHeight: '100vh', padding: '20px' }}>
      <Stack align="center" gap="lg">
        <Title order={1}>Hello</Title>
        <Button onClick={() => open()} color="blue">
          {connected && publicKey
            ? `Connected: ${publicKey.toBase58().slice(0, 6)}...`
            : 'Connect Wallet'}
        </Button>
      </Stack>
    </Container>
  );
}
