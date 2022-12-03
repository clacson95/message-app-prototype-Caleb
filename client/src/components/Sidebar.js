import React, { useState } from "react";
import { Tabs, Tab, BottomNavigation } from "@mui/material";
import { Nav, TabPane, TabContainer, TabContent } from "react-bootstrap";
import Conversations from "./Conversations.js";
import Contacts from "./Contacts.js";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="d-flex flex-column">
      <TabContainer activeKey={activeKey} onSelect={setActiveKey}>
        <Nav className="justify-content-center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab
              eventKey={CONVERSATIONS_KEY}
              label="Conversations"
              href="/conversations"
            />
            <LinkTab
              eventKey={CONTACTS_KEY}
              label="Contacts"
              href="/contacts"
            />
          </Tabs>
        </Nav>
        <TabContent>
          <TabPane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </TabPane>
          <TabPane eventKey={CONTACTS_KEY}>
            <Contacts />
          </TabPane>
        </TabContent>
        <BottomNavigation
          style={{
            padding: "2%",
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          <label>
            Your ID: <span>{id}</span>
          </label>
        </BottomNavigation>
      </TabContainer>
    </div>
  );
}
