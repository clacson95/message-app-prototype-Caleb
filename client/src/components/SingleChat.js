import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Spinner, Text, Toast, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import { getSender } from "../config/ChatFunctions";
import UpdateGroupChatModal from "./elements/UpdateGroupChatModal";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const { user, selectedChat, setSelectedChat } = ChatState();

const toast = useToast();

const fetchMessages = async () => {
  if (!selectedChat) {
    return;
  }

  try {
    const config = {
      Headers: {
        Authorization: `Bearer ${user.token}`,
      }
    }
    setLoading(true);
    const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
    setMessages(data);
    setLoading(false);
  } catch (error) {
    toast({
      title: "Error Occured",
      description: "Unable to load messages",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    })
  }
}

useEffect(() => {
  fetchMessages();
}, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          Headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        }, config);
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Unable to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

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
              <Input variant="filled" bg="#E0E0E0" placeholder="Say something!" onChange={typingHandler} value={newMessage}/>
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
