import { Box, Stack } from "@chakra-ui/react";
import React from "react";
// import { ChatState } from "../Context/chatProvider";
import SideDrawer from "../components/elements/SideDrawer";
import MyChats from "../components/MyChats";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  // const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {<SideDrawer />}
      <Box d="flex" justifyContent="space-between" width="100%" height="91.5vh" padding="10px" >
        <Stack spacing="80%" direction="row">
        {<MyChats />}
        {<ChatWindow />}
        </Stack>
      </Box>
    </div>
  );
};

export default ChatPage;
