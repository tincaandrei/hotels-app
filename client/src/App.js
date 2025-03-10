import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './booking/Home'
import Registration from './auth/Registration';
import Login from './auth/Login';
import TopNav from "./components/TopNav";
import { ToastContainer } from 'react-toastify';
import {Slide} from 'react-toastify'


function App() {
  return (
    <BrowserRouter >
      <TopNav/>
      <ToastContainer 
      position="top-center"
      autoClose={3400}
      theme="dark"
      transition={Slide}
      />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
