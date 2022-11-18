import React, { useEffect, useState } from "react";
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
  Link,
} from "@chakra-ui/react";
import abi from "./contractData/abi.json";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { ethers } from "ethers";
import Event from "./components/Event";
import contract_config from "./contractData/contractConfig";

const Register = (user) => {
  // const [events, setEvents] = useState([]);

  // const getEvents = () => {
  //   const {
  //     data: totalEvents,
  //     isError,
  //     isLoading,
  //   } = useContractRead({
  //     ...contract_config,
  //     functionName: "next_event_proposal",
  //   });

  //   // const arr = [];

  //   // for (let i = 1; i < totalEvents; i++) {
  //   //   const { data: event } = useContractRead({
  //   //     ...contract_config,
  //   //     functionName: "event_proposals",
  //   //     args: [i],
  //   //   });
  //   //   console.log(event);
  //   //   arr.push(event);
  //   // }
  //   // // setEvents(arr);
  //   // // console.log(arr);
  //   // setEvents(arr);
  //   // return arr;

  //   // // return (
  //   // //   <ul>
  //   // //     {arr.map((event, index) => (
  //   // //       <li>ehiokoj</li>
  //   // //     ))}
  //   // //     {/* bcudefufyu */}
  //   // //   </ul>
  //   // // );
  // };
  // useEffect(() => {
  //   getEvents();
  // }, []);
  const showEvents = () => {
    // let arr = ;
    const {
      data: totalEvents,
      isError,
      isLoading,
    } = useContractRead({
      ...contract_config,
      functionName: "next_event_proposal",
    });

    let arr = [];
    for (let i = totalEvents - 1; i >= 1; i--) {
      arr.push(<Event eventId={i} user={user.user} key={i}></Event>);
    }
    return arr;

    // let arr = events.filter((event) => event.status === 2);
    // console.log(arr);
    // // console.log(arr);
    // // const arr = [1, 2, 3, 4, 5];
    // let res = arr.map((event, index) => (
    //   <Event event={event} user={user.user}></Event>
    // ));
    // return res;
    // // return (return arr;
    // //   <UnorderedList>
    // //     {arr.map((event, index) =>
    // //        <p>HEyyaa</p>
    // //     )}
    // //   </UnorderedList>
    // // );
  };
  // console.log(user);
  // useEffect(() => {
  //   setEvents(showEvents());
  // }, []);

  return (
    <div width="50vw">
      <Link href="/BookEvent">
        <Button
          disabled={!user.user}
          border="2px"
          backgroundColor="lightgreen"
          borderRadius="20px"
        >
          + new event
        </Button>
      </Link>
      <UnorderedList width="80%">{showEvents()}</UnorderedList>

      {/* <Button disabled={!write} onClick={() => write?.()}>
          Write
        </Button> */}
    </div>
  );
};
export default Register;
