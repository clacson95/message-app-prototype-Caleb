import React from "react";
import ScrollableFeed from "react-scroll";
import { isLastMessage, isSameSender, isSameSenderFormat, isSameUser } from "../config/ChatFunctions";
import { ChatState } from "../Context/chatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {isSameSender(
              messages,
              m,
              i,
              user._id || isLastMessage(messages, i, user._id)
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderFormat(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
                {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
