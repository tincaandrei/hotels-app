import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopNav from "./components/TopNav";
import { ToastContainer } from 'react-toastify';
import {Slide} from 'react-toastify'
import PrivateRoute from "./components/privateRoute";
//components

import Home from './booking/Home'
import Registration from './auth/Registration';
import Login from './auth/Login';
import Dashboard from "./user/dashboard";
import DashboardSeller from "./user/dashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";

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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/seller"
          element={
            <PrivateRoute>
              <DashboardSeller />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/new"
          element={
            <PrivateRoute>
              <NewHotel />
            </PrivateRoute>
          }
        />
        <Route
          path="/callback"
          element={
            <PrivateRoute>
              <StripeCallback />
            </PrivateRoute>
          }
        />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
