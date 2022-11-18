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
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

import contract_config from "./contractData/contractConfig";

const Host = (props) => {
  const [formState, setFormState] = useState({
    eventId: 0,
    addresses: "",
  });
  const { config } = usePrepareContractWrite({
    ...contract_config,
    functionName: "verifyParticipants",
    args: [+formState.eventId, [...formState.addresses.split(",")]],
  });
  //   const { config } = usePrepareContractWrite({
  //     ...contract_config,
  //     functionName: "countVotes",
  //     args: [2],
  //   });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const formChangeHandler = (e) => {
    if (e.target.name === "eventId") {
      setFormState({ ...formState, eventId: +e.target.value });
    } else {
      setFormState({ ...formState, addresses: e.target.value });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log([formState.addresses.split(",")]);
    console.log(write);
    console.log(config);
    write?.();
  };
  return (
    <Box width="70%">
      <form onSubmit={submitHandler} marginTop="2rem">
        <FormControl>
          <FormLabel>
            Event id(Caller must be the host of this eventId)
          </FormLabel>
          <Input
            placeholder="Event must be over"
            type="number"
            name="eventId"
            onChange={formChangeHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Enter addresses which attended the event(separated by comma)
          </FormLabel>
          <Input type="text" name="addresses" onChange={formChangeHandler} />
        </FormControl>



        {props.user ? (
          <Button m="20px" type="submit" onClick={() => write?.()}>
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
export default Host;
