import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import About from "./Pages/About";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      <Nav />
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/about" component={About} exact />
        <Route path="/chats" component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;