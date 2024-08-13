import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import DashBoard from './components/DashBoard'
import BookList from './components/BookList'

axios.defaults.baseURL = 'http://localhost:3000'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/booklist" element={<BookList />}></Route>
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
  )
}

export default App
