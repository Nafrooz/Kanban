import './App.css';
import Home from './screens/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
     
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
           
          
          

          </Routes>
        </Router>
      
    </>
  );
}

export default App;
