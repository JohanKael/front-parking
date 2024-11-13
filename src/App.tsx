import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminUser from './pages/Admin/AdminUser.tsx';
import NotFound from './pages/NotFound.tsx';
import AdminImport from './pages/Admin/AdminImport.tsx';
import FilterGate from './pages/Admin/FilterGate.tsx';
import ListUser from './pages/Admin/ListUser.tsx';
import Ocr from './pages/Admin/Ocr.tsx';
import AdminPaie from './pages/Admin/AdminPaie.tsx';
import Paie from './pages/User/Paie.tsx';
import Gate from './pages/User/Gate.tsx';
import AdminPaieLog from './pages/Admin/AdminPaieLog.tsx';
import PaieLog from './pages/User/PaieLog.tsx';
import AdminComparatif from './pages/Admin/AdminComparatif.tsx';

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
          <Route path="/admin/home" element={<AdminPaieLog />} />
          <Route path="/admin/paie" element={<AdminPaie />} />
          <Route path="/admin/list" element={<ListUser />} />
          <Route path="/admin/comparatif" element={<AdminComparatif />} />
          <Route path="/home" element={<PaieLog />} />
          <Route path="/paie" element={<Paie />} />
          <Route path="/gate" element={<Gate />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
