import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/store';
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignUp from './pages/signUpPages/signUpPage/SignUp.jsx';
import LogIn from './pages/logInPage/LogIn.jsx';
import FormPage from './pages/signUpPages/formPage/FormPage.jsx';
import StrategyPage from './pages/signUpPages/strategyPage/StrategyPage.jsx';
import PaymentPage from './pages/signUpPages/paymentPage/PaymentPage.jsx';
import UserInterface from './pages/UserInterface/UserInterface.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import AdminInterface from './pages/AdminInterface/AdminInterface.jsx';
import UserStrategy from './pages/AdminInterface/sections/NewUsers/UserStrategy.jsx';
import NewUsers from './pages/AdminInterface/sections/NewUsers/NewUsers.jsx';
import ActiveUsers from './pages/AdminInterface/sections/ActiveUsers/ActiveUsers.jsx';
import UnactiveUsers from './pages/AdminInterface/sections/UnactiveUsers/UnactiveUsers.jsx';
import ResubscribedUsers from './pages/AdminInterface/sections/ResubscribedUsers/ResubscribedUsers.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/homepage' element={<HomePage/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<LogIn/>} />
          <Route path='/form' element={<FormPage/>} />
          <Route path='/strategy' element={<StrategyPage/>} />
          <Route path='/payment' element={<PaymentPage/>} />
          <Route path='/userinterface' element={<UserInterface/>} />
          <Route path='/resetpassword' element={<ResetPassword/>} />
          <Route path='/admin' element={<AdminInterface />} />
          <Route path='/admin/user/:userId/strategy' element={<UserStrategy />} />
          <Route path='/admin/user/activeusers' element={<ActiveUsers />} />
          <Route path='/admin/user/resubscribedusers' element={<ResubscribedUsers />} />
          <Route path='/admin/user/unactiveusers' element={<UnactiveUsers />} />
          <Route path='/admin/user/newusers' element={<NewUsers />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);
