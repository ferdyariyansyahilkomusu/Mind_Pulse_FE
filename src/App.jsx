import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Diary from './pages/Diary';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRouted';

const AppLayout = ({ children }) => {
  const location = useLocation();
  // Mengecek apakah kita sedang berada di halaman login atau register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Navbar tidak akan ditampilkan di halaman Login/Register */}
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? "container py-4" : ""}>{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* PERUBAHAN DI SINI: Root URL (/) langsung diarahkan ke /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diary" element={<ProtectedRoute> <Diary /> </ProtectedRoute>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;