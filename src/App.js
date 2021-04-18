import logo from "./logo.svg";
import "./App.css";
import Post from "./Components/Post";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeView from "../src/Components/HomeView";
import Navbar from "./Components/Navbar";
import Upload from "./Components/Upload";
import { GlobalProvider } from "./Components/AuthState/GlobalContext";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Post} />
            <Route exact path="/post" component={Upload} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
