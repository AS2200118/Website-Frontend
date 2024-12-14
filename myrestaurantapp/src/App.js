import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <switch>
          <Route path="/" exact Component={Home} />
        </switch>
      </Router>
    </div>
  );
}

export default App;
