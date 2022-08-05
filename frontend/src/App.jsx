import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Product from './pages/Product';
import Infos from './pages/Infos';
import Purchase from './pages/Purchase';
import Search from './pages/Search';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import { useUserContext } from './contexts/UserContext';

const App = () => {

  const {currentUser}=useUserContext();

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/infos' element={ currentUser ? <Infos /> : <Navigate to='/' />} />
        <Route path='/orders' element={currentUser ? <Orders /> : <Navigate to='/' />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/search' element={<Search />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;