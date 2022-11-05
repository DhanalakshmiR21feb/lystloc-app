import logo from './logo.svg';
import './App.css';
import Home from './Home';
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/v1`,
};
function App() {
  return (
    <div className="Container">
      <div className='Body'>
       <h3>
          Welcome to Lystloc Token Validation App      
        </h3>
        <Home />
        </div>
     </div>
  );
}

export default App;
