import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminUser from './pages/Admin/AdminUser.tsx';
import NotFound from './pages/NotFound.tsx';
import AdminImport from './pages/Admin/AdminImport.tsx';
import FilterGate from './pages/Admin/FilterGate.tsx';
import Ocr from './pages/Admin/Ocr.tsx';
import AdminPaie from './pages/Admin/AdminPaie.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/go/admin" element={<AdminLogin />} />
          <Route path="/go/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/admin/import" element={<AdminImport />} />
          <Route path="/admin/gate" element={<FilterGate />} />
          <Route path="/admin/ocr" element={<Ocr />} />
          <Route path="/admin/home" element={<AdminPaie />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
