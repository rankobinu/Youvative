import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignUp from './pages/signUpPages/signUpPage/SignUp.jsx';
import LogIn from './pages/logInPage/LogIn.jsx';
import FormPage from './pages/signUpPages/formPage/FormPage.jsx'
import UserInterface from './pages/UserInterface/UserInterface.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>

        <Route path='/' element={<HomePage/>} />
        <Route path='/homepage' element={<HomePage/>} />


        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<LogIn/>} />


        <Route path='/userinterface' element={<UserInterface/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/form' element={<FormPage/>} />
      </Routes>
    </Router>
  </StrictMode>,
);
