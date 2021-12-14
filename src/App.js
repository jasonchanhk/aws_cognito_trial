import './App.css';
import Signup from './component/signup';
import Verify from './component/verify';
import Signin from './component/signin';
import { Account } from './component/account';
import Status from './component/status';
import Setting from './component/setting';
import Forgot from './component/forgot';
import {  BrowserRouter,  Routes,  Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Account>
        <BrowserRouter>
          <Status />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} /> {/*not necessary anymore because of switching to verification link*/}
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot" element={<Forgot />} />
          </Routes>
          <Setting />
        </BrowserRouter>
      </Account>
    </div>
  );
}

export default App;
