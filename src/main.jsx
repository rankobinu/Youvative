import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignUp from './pages/SignUpPage/SignUp.jsx';
import LogIn from './pages/logInPage/LogIn.jsx';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/LogIn' element={<LogIn/>}></Route>
      </Routes>
    </Router>
  </StrictMode>,
);
