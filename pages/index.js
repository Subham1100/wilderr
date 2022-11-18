import React, { useEffect, useState } from "react";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Container,
  Text,
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  keyframes,
  ChakraProvider,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import Image from "next/image";
import wilderr from "./logo/wilderr2.png";
import contract_config from "./contractData/contractConfig";
// import styles from "./css/index.module.css";
// import Register from "./components/Register";
import dynamic from "next/dynamic";
// import Dao from "./Dao";
const Register = dynamic(() => import("./Register"), { ssr: false });
const Dao = dynamic(() => import("./Dao"), { ssr: false });
const BookEvent = dynamic(() => import("./BookEvent"), { ssr: false });
const Host = dynamic(() => import("./Host"), { ssr: false });
const Proof = dynamic(() => import("./Proof"), { ssr: false });
const NFT = dynamic(() => import("./NFT"), { ssr: false });
const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(-5); border-radius: 20%;  }
  10% { transform: scale(1) rotate(5); border-radius: 20%;  }
  20% { transform: scale(1) rotate(-5); border-radius: 20%;  }
  30% { transform: scale(1) rotate(5deg); border-radius: 20%;  }
  50% { transform: scale(1) rotate(-5deg); border-radius: 20%;  }
  60% { transform: scale(1) rotate(5deg); border-radius: 20%;  }
  75% { transform: scale(1) rotate(-5deg); border-radius: 20%; }
  100% { transform: scale(1) rotate(0);  border-radius: 20%; }
`;
//yo
const animation = `${animationKeyframes} 2s ease-in-out infinite`;

function App() {
  const { address, isConnected } = useAccount();
  return (
    <Box
      bgGradient="linear(to-r, #D3AB9F, #F4ECBE)"
      // className={styles.container}
      // w="1440px"
      // h="1024px"
      w="100%"
      h="100vh"
      pl="100px"
      pr="100px"
    >
      <Flex
        justifyContent="space-between"
        marginBottom="10"
        borderBottom="3px"
        borderColor="black"
      >
        <Box
          mx="100px"
          h="130px"
          w="230px"
          boxShadow="2px solid black"
          margin="10px 10px"
        >
          <Image w="100%" h="100%px" src={wilderr}></Image>
        </Box>
        <Text
          fontWeight="bold"
          bgGradient="linear(to-r,cyan.400,blue.500,purple.600)"
          textAlign="center"
          fontSize="80px"
          bgClip="text"
          borderRadius="10%"
          m={(20, 10)}
          letterSpacing="4px"
        >
          Wilderr
        </Text>
        <Box borderRadius="22%" h="40px" boxShadow="dark-lg" margin="1rem">
          <ConnectButton />
        </Box>
      </Flex>
      <Tabs
        variant="solid-rounded"
        size="lg"
        colorScheme="purple"
        align="center"
      >
        <TabList
          bg="#DEC3BA"
          w="30%"
          borderRadius="15%"
          display="flex"
          flexDir="column"
          marginRight="auto"
          padding="20px"
          boxShadow="dark-lg"
          p="10"
        >
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            Home
          </Tab>
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            Events
          </Tab>
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            DAO
          </Tab>
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            Host
          </Tab>
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            Submit proof
          </Tab>
          <Tab _hover={{ animation: animation }} fontWeight="bold">
            Mint NFT
          </Tab>
          {/* <Tab fontWeight="bold</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            boxShadow="dark-lg"
            p="10"
          >
            <Heading marginTop="4rem" fontFamily="cursive">
              Rewarding people for connecting with nature
            </Heading>
            <Text textAlign="center" width="100%" marginTop="4rem">
              Nature-to-Earn (N2E) is a purpose-driven token that rewards people
              for getting out into nature. We believe that connecting with
              nature pushes people to take better care of nature. By having N2E
              validators facilitate nature events (e.g. hikes, mushroom forays,
              beach cleanups, etc), we can verify people's participation in
              nature events & reward them accordingly{" "}
            </Text>
          </TabPanel>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            boxShadow="dark-lg"
            p="10"
          >
            <Register user={address} />
          </TabPanel>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            pl="140px"
            boxShadow="dark-lg"
            p="10"
          >
            <Dao user={address}></Dao>
          </TabPanel>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            pl="230px"
            pt="50px"
            boxShadow="dark-lg"
            p="10"
          >
            <Host user={address}></Host>
          </TabPanel>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            pl="230px"
            pt="50px"
            boxShadow="dark-lg"
            p="10"
          >
            <Proof user={address}></Proof>
          </TabPanel>
          <TabPanel
            w="68%"
            minH="550px"
            marginLeft="auto"
            my="-450"
            bg="#DEC3BA"
            borderRadius="10%"
            display="flex"
            flexDir="column"
            padding="20px"
            pl="230px"
            pt="50px"
            boxShadow="dark-lg"
            p="10"
          >
            <NFT user={address}></NFT>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;