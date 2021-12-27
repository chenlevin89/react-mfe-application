
import './App.css';
import Operations from './components/Operations'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import '@chenlevin89/awesome-lib/dist/index.css'

function App() {
  return (
    <Router>
      <Operations />
    </Router>
  );
}

export default App;
