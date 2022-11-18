import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
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
  useContract,
  useAccount,
} from "wagmi";
import contract_config from "./contractData/contractConfig";
import DaoEvent from "./components/DaoEvent";

function Dao(props) {
  // const [daoEventCode, setDaoEventCode] = useState();

  // const contract = useContract({
  //   ...contract_config,
  // });
  // console.log(useContract);
  // console.log(contract);
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address);
  // console.log("connecting", isConnecting);
  // console.log("connected", isDisconnected);

  const { data, isError, isLoading } = useContractRead({
    ...contract_config,
    functionName: "next_event_proposal",
    enabled: false,
  });
  // console.log(data);
  console.log(contract_config);
  const showEvents = () => {
    let arr = [];

    for (let i = data - 1; i >= 1; i--) {
      console.log("DAO page running");
      arr.push(
        <DaoEvent
          suppressHydrationWarning
          eventId={i}
          user={props.user}
        ></DaoEvent>
      );
    }
    return arr;
  };

  // useEffect(() => {
  //   setDaoEventCode(showEvents());
  // }, []);

  return (
    // <Box>

    <Box width="90%">
      <UnorderedList>{showEvents()}</UnorderedList>
    </Box>
  );
}
export default Dao;
