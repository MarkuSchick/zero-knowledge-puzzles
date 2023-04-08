import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ChakraProvider } from '@chakra-ui/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '@/styles/globals.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string}),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })
  return (
    <ChakraProvider>

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
  <Component {...pageProps} />
      </RainbowKitProvider>
</WagmiConfig>
</ChakraProvider>
  )
}