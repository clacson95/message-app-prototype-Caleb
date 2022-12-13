import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./authentication/authentication/Homepage";
import ChatPage from "./authentication/ChatPage";
import Nav from "./components/Nav";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
