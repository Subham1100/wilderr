import React from "react";
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
} from "@chakra-ui/react";
import abi from "../contractData/abi.json";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

import contract_config from "../contractData/contractConfig";

function Event(props) {
  const { data: res1 } = useContractRead({
    ...contract_config,
    functionName: "isEventNotOver",
    args: [props.eventId],
  });

  const { data: event } = useContractRead({
    ...contract_config,
    functionName: "event_proposals",
    args: [props.eventId],
  });
  // console.log(event);

  const { data: res3 } = useContractRead({
    ...contract_config,
    functionName: "participant_info",
    args: [props.eventId, props.user],
  });
  const { data: res4 } = useContractRead({
    ...contract_config,
    functionName: "isEventNotOver",
    args: [props.eventId],
  });

  const btn = () => {
    const res2 = event.currentAudienceCount < event.maxAudience;

    if (!props.user) {
      return <Button disabled>Not connected</Button>;
    } else if (res3?.registerdForEvent) {
      return <Button disabled>Already registered</Button>;
    } else if (!res4) {
      return <Button disabled>Event Over</Button>;
    } else if (!res2) {
      return <Button disabled>All slot booked</Button>;
    } else if (res1 && res2) {
      return (
        <Button>
          <Link href="/RegisterInEvent">
            <text>Register</text>
          </Link>
        </Button>
      );
    } else {
      return <Button disabled>Cannot register</Button>;
    }
    // console.log(res3.registerdForEvent);
  };

  return (
    <div>
      {event?.status == 2 && (
        <ListItem
          border="2px"
          borderColor="white"
          p="10px 15px"
          m="18px"
          borderRadius="20px"
        >
          <Flex pd="2px" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="md">{event.id + ". " + event.name}</Heading>
            </Box>
            <Button>
              <a href={event.uri}>Details</a>
            </Button>
            {btn()}
          </Flex>
          {/* {props.event.name} */}
        </ListItem>
      )}
    </div>
  );
}

export default Event;
