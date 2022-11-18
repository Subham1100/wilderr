import React, { useState } from "react";
import Link from "next/link";

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
  Input,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contract_config from "./contractData/contractConfig";

const NFT = (props) => {
  const [formState, setFormState] = useState({
    eventId: 0,
  });
  const formChangeHandler = (e) => {
    if (e.target.name === "eventId") {
      setFormState({ ...formState, eventId: +e.target.value });
    }
  };
  const { config } = usePrepareContractWrite({
    ...contract_config,
    functionName: "mintNft",
    args: [formState.eventId],
  });
  const { write } = useContractWrite(config);

  return (
    <Box width="70%">
      <form>
        <FormControl>
          <FormLabel>Event id</FormLabel>
          <Input
            placeholder="Caller must be eligible to get NFT of this eventId"
            type="number"
            name="eventId"
            onChange={formChangeHandler}
          />
        </FormControl>

        {props.user ? (
          <Button type="submit" marginTop="1rem" onClick={() => write?.()}>
            Submit
          </Button>
        ) : (
          <Button type="submit" disabled={true} marginTop="1rem">
            Not connected
          </Button>
        )}
      </form>
    </Box>
  );
};
export default NFT;
