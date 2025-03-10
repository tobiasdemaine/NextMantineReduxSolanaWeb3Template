'use client';

// App.tsx
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks';
import { createAppKit, useAppKit } from '@reown/appkit/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Button, Container, Stack, Title } from '@mantine/core';

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// 1. Get projectId from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID';

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Solana Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Create modal
createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

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
