import React, { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
// import Conversations from "./Conversations.js";
// import Contacts from "./Contacts.js";

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
  }

  return (
    <div className="d-flex flex-column">
      <Container activeKey={activeKey} onSelect={setActiveKey}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab
            eventKey={CONVERSATIONS_KEY}
            label="Conversations"
            href="/conversations"
          />
          <LinkTab eventKey={CONTACTS_KEY} label="Contacts" href="/contacts" />
        </Tabs>
      </Container>
    </div>
  );
}
