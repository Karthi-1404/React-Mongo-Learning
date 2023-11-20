import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/signin'
import Register from './pages/register'
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react'
import Spinner from './components/spinner';
import { useSelector } from 'react-redux';
import Profile from './pages/profile';
import AdminProfile from './pages/admin/index';
import ProfileInfo from './pages/productInfo.js';

function App() {
  const {loading} = useSelector((state) => state.loaders)
  return (
    
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
         <Routes>
           <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
           <Route path="/product/:id" element={<ProtectedRoute><ProfileInfo/></ProtectedRoute>} />
           {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} /> */}
           <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
           <Route path="/admin" element={<ProtectedRoute><AdminProfile/></ProtectedRoute>} />
           <Route path='/signin' element={<Signin/>} />
           <Route path='/Register' element={<Register/>} />
         </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
