import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Nav() {

    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
      };
  return (
    <div className="topnav">
      <Button onClick={logoutHandler}>Logout</Button>  
      <a href="/chats">Chat</a>
      <a href="/about">Donation</a>
      <a href="/about">Story</a>
    </div>
  );
}
export default Nav;