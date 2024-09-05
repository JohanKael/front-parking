import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminHome from './pages/Home/AdminHome.tsx';
import NotFound from './pages/NotFound.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/go/admin" element={<AdminLogin />} />
          <Route path="/go/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
