import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from './store/redux'
import { Provider } from 'react-redux'

import './index.css';

import App from './App';
import HomePage from './Component/Pages/Home/HomePage';
import AboutPage from './Component/Pages/About/AboutPage';
import SignUp from './Component/Pages/SignUp/SignUp';
import Login from './Component/Pages/Login/Login';
import FindInvestors from './Component/Pages/FindInvestors/FindInvestors';
import FindInvestees from './Component/Pages/FindInvestee/FindInvestee';
import UserProfile from './Component/Pages/UserProfile/UserProfile';
import ProfileManagement from './Component/Pages/ProfileManagement/ProfileManagement';
import ContactUs from './Component/Pages/CntactUs/ContactUs';
import Membership from './Component/Pages/Membership/Membership';
import Messages from './Component/Pages/Messages/Messages';
import FAQPage from './Component/Pages/FAQPage/FAQPage';
import Page404 from './Component/Pages/Page404/Page404';
import LearningRoom from './Component/Pages/LearningRoom/LearningRoom';
import ArticleDetail from './Component/Pages/ArticleDetail/ArticleDetail';
import PaymentForm from './Component/Pages/Payment/PaymentForm';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="find-investors" element={<FindInvestors />} />
      <Route path="find-investees" element={<FindInvestees />} />
      <Route path="user-profile/:id" element={<UserProfile />} />
      <Route path="profile-management/" element={<ProfileManagement />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="membership" element={<Membership />} />
      <Route path="/message" element={<Messages />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="message/:userID" element={<Messages />} />
      <Route path="learning-room" element={<LearningRoom />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
