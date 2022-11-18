import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  Select,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import abi from "./contractData/abi.json";
import {
  useProvider,
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contract_config from "./contractData/contractConfig";
import { File } from "web3.storage";
import makeStorageClient from "./components/storageClient";

const BookEvent = (props) => {
  const [eventDate, setEventDate] = useState(0);
  const [cid, setCid] = useState("");
  const [formState, setFormState] = useState({
    Ename: "",
    audience: 0,
    date: 0,
    location: "",
    Hname: "",
    Hemail: "",
    info: "",
  });

  const { config } = usePrepareContractWrite({
    ...contract_config,
    functionName: "registerEvent",
    args: [cid, formState.date, formState.Ename, formState.audience],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  // console.log(write);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formChangeHandler = (e) => {
    if (e.target.name === "audience") {
      setFormState({ ...formState, audience: +e.target.value });
      console.log(+e.target.value);
    } else if (e.target.name === "date") {
      setEventDate(e.target.value);
      let dateThen = new Date(e.target.value);
      dateThen = dateThen.getTime();
      let dateNow = new Date();
      dateNow = dateNow.getTime();
      let d;
      d = (dateThen - dateNow) / 1000;
      d = Math.trunc(d);
      console.log(d);
      setFormState({ ...formState, date: d });
    } else if (e.target.name === "Ename") {
      setFormState({ ...formState, Ename: e.target.value });
    } else if (e.target.name === "location") {
      setFormState({ ...formState, location: e.target.value });
    } else if (e.target.name === "Hname") {
      setFormState({ ...formState, Hname: e.target.value });
    } else if (e.target.name === "Hemail") {
      setFormState({ ...formState, Hemail: e.target.value });
    } else if (e.target.name === "info") {
      setFormState({ ...formState, info: e.target.value });
    }
  };

  const getImageLink = async () => {
    // get file
    const file = document.querySelector('input[type="file"]');

    // upload file
    const client = makeStorageClient();
    const cid = await client.put(file.files);

    // construct file url and return
    const imageUri = `https://${cid}.ipfs.dweb.link/${file.files[0].name}`;

    return imageUri;
  };

  const generateData = async () => {
    const imageUri = await getImageLink();

    const metadata = {
      name: formState.Ename,
      picture: imageUri,
      location: formState.location,
      date: eventDate,
      hostName: formState.Hname,
      hostEmail: formState.Hemail,
      moreInfo: formState.info,
    };
    console.log(metadata);
    return metadata;
  };
  const makeFile = async () => {
    const obj = await generateData();
    const blob = Buffer.from(JSON.stringify(obj));

    const file = [new File([blob], "user_info.json")];

    return file;
  };

  const storeData = async () => {
    const client = makeStorageClient();
    const file = await makeFile();

    const _cid = await client.put(file);
    const cidLink = `https://${_cid}.ipfs.dweb.link/user_info.json`;
    setCid(cidLink);

    return cidLink;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let cidLink = await storeData();
    cidLink = cidLink.toString();
    setCid(cidLink);
    console.log(cidLink);
    // console.log(write);
    console.log(formState);

    write?.();
    // contract.registerEvent("Example.com", 20, "winterland", 1000);
    //TODO
    // upload form data to ipfs and call SC function 'registerEvent' with ipfs link
  };

  return (
    <>
      {isLoading ? (
        <Modal isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction processing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading>Loading....</Heading>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Flex justifyContent="center" alignItems="center" marginTop="5rem">
          <form onSubmit={submitHandler}>
            <Flex>
              <FormControl m="5px">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Event name"
                  type="text"
                  name="Ename"
                  onChange={formChangeHandler}
                />
              </FormControl>
              <FormControl m="5px">
                <FormLabel>Max audience</FormLabel>
                <Input
                  placeholder="maximum audience"
                  type="number"
                  name="audience"
                  onChange={formChangeHandler}
                />
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>Event date</FormLabel>
              <Input
                placeholder="event date"
                type="date"
                name="date"
                onChange={formChangeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Event location</FormLabel>
              <Input
                placeholder="event location"
                type="text"
                name="location"
                onChange={formChangeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Host Name</FormLabel>
              <Input
                placeholder="Host name"
                type="text"
                name="Hname"
                onChange={formChangeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Host Email</FormLabel>
              <Input
                placeholder="Host email"
                type="text"
                name="Hemail"
                onChange={formChangeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Tell us more about the yourself and the event
              </FormLabel>
              <Textarea
                name="info"
                onChange={formChangeHandler}
                placeholder="Here is a sample placeholder"
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Event poster</FormLabel>
              <Input
                type="file"
                name="info"
                onChange={formChangeHandler}
                size="sm"
              />
            </FormControl>
            <Link href="/">
              <a>
                <Button marginTop="10px" type="submit">
                  Submit
                </Button>
              </a>
            </Link>
          </form>
        </Flex>
      )}
    </>
  );
};
export default BookEvent;
