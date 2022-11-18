import React from "react";
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
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useBlockNumber,
} from "wagmi";
import contract_config from "../contractData/contractConfig";

const DaoEventSeparate=()=>{

    const { voteF } = usePrepareContractWrite({
        ...contract_config,
        functionName: "voteForEvent",
        args: [props.eventId, true],
      });
      const { voteA } = usePrepareContractWrite({
        ...contract_config,
        functionName: "voteForEvent",
        args: [props.eventId, false],
      });
      const { countVotes } = usePrepareContractWrite({
        ...contract_config,
        functionName: "countVotes",
        args: [props.eventId],
      });
      const { data: blockNum } = useBlockNumber();
    
      const vote = (_vote) => {
        if (_vote) {
          const { data, isLoading, isSuccess, write } = useContractWrite(voteF);
        } else {
          const { data, isLoading, isSuccess, write } = useContractWrite(voteA);
        }
      };

    const btn = () => {
        if (!props.user) {
          return <Button disabled>Not connected</Button>;
        } else if (num != 2) {
          return <Button disabled>Not DAO member</Button>;
        } else if (event.status === 2) {
          return (
            <Button disabled backgroundColor="lightgreen">
              Passed
            </Button>
          );
        } else if (event.status === 2) {
          return (
            <Button disabled backgroundColor="red.400">
              Rejected
            </Button>
          );
        } else if (hasVoted) {
          return <Button disabled>Already voted</Button>;
        } else {
          return (
            <Box>
              {blockNum > event.deadline ? (
                <Button marginRight="5px">Count </Button>
              ) : (
                <>
                  <Button marginRight="5px" onClick={() => vote(true)}>
                    For
                  </Button>
                  <Button onClick={() => vote(false)}>Against</Button>
                </>
              )}
            </Box>
          );
        }
      };
    
}