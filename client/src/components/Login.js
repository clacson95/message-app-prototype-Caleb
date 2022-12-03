import React, { useRef } from "react";
import { Container, Stack, FormControl, TextField, FormLabel, Button } from "@mui/material";
import "../styles/Login.css";
import { v4 as uuidV4 } from "uuid";


export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }


  return (
    <Container className="LoginContainer">
    <Container className="align-items-center d-flex" style={{ width: "30%"}}>
      <Stack spacing={2}>
      <FormLabel>Login</FormLabel>
      <FormControl type="text" required>
      <TextField id="standard-basic" label="Enter ID" variant="standard" ref={idRef}/>
      </FormControl>
      </Stack>
      <Container className="align-items-center" style={{ padding: "20px" }}>
      <Button type="submit" onClick={handleSubmit} >Login</Button>
      <Button variant="secondary" onClick={createNewId}>Create A New ID</Button>
      </Container>
    </Container>
    </Container>
  );
}