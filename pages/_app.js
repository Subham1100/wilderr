import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const { chains, provider } = configureChains(
  [chain.hardhat],
  [
    // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    // jsonRpcProvider({ rpc: () => ({ http: "https://rpc.ankr.com/gnosis" }) }), //<<<< New RPC Provider
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={lightTheme({
            accentColor: "#623485", //color of wallet  try #703844
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

// export default MyApp;
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
