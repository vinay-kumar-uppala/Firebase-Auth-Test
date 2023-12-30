import './App.css';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp  from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Routes>
            <Route exact path="/Dashboard" element={<Dashboard/>}></Route>
            <Route exact path="/Login" element={<Login/>}></Route>
            <Route exact path="/SignUp" element={<SignUp/>}></Route>
            <Route exact path="" element={<Dashboard/>}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
