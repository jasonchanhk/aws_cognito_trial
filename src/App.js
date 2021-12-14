import logo from './logo.svg';
import './App.css';
import Signup from './component/signup';
import Verify from './component/verify';
import Signin from './component/signin';
import { Account } from './component/account';
import Status from './component/status';
import Setting from './component/setting';
import {  BrowserRouter,  Routes,  Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Account>
        <BrowserRouter>
          <Status />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <Setting />
        </BrowserRouter>
      </Account>
    </div>
  );
}

export default App;
