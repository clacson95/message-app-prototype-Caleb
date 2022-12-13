import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import { getSender } from "../config/ChatFunctions";
import UpdateGroupChatModal from "./elements/UpdateGroupChatModal";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../animations/typing.json";

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  // ==========================================================
  // Use State Setup
  // ==========================================================
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // ==========================================================
  // Importing options from Lottie JSON
  // ==========================================================
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

  // ==========================================================
  // Initializing Socket.io
  // ==========================================================
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  // ==========================================================
  // ==========================================================
  // Get Messages Functionality
  // ==========================================================
  // ==========================================================
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        Headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      // Socket.io
      socket.emit("join chat", selectedChat._id);
      // ==========================================================
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Unable to load messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // ==========================================================
  // Socket for receiving a new message
  // ==========================================================
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // send notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // ==========================================================
  // ==========================================================
  // Send Message Functionality
  // ==========================================================
  // ==========================================================
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // Socket for typing
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          Headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // Socket for sending a new message
        socket.emit("new message", data);
        setMessages([...messages, data]);
        // ==========================================================
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Unable to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  // ==========================================================
  // ==========================================================
  // Typing Functionality
  // ==========================================================
  // ==========================================================
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // If the socket is not connected, ignore this function
    if (!socketConnected) return;
    // Or...
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    // Functionality for when and when not to display typing animation
    let stoppedTyping = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - stoppedTyping;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // ==========================================================
  // Output
  // ==========================================================

  return (
    <>
      {" "}
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work Sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}

              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Say something!"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
            Test
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
