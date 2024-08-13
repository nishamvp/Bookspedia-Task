import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Provider} from "react-redux"
import Login from './components/Login';
import Register from './components/Register';
import DashBoard from './components/DashBoard';
import BookList from './components/BookList';
import PrivateRoute from './components/auth/PrivateRoute';
import store from './store/store';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/booklist" element={<BookList />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
    </Router>
    </Provider>
  );
}

export default App;

