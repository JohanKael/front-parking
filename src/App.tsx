import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/go/admin" element={<AdminLogin />} />
          <Route path="/go/admin/signup" element={<AdminSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
