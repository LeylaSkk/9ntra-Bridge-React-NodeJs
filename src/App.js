import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Course from './Pages/Course';

import Cart from './Pages/Cart';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { CartProvider } from './Context/CartContext';
import AdminDashboard from './Pages/AdminDashboard';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/course' element={<Course />}>
              <Route path=':courseId' element={<Course />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/AdminDashboard' element={<AdminDashboard/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;