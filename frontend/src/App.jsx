import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Purchase from './pages/Purchase';
import Search from './pages/Search';

const App = () => {
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
        <Route path='/profile' element={<Profile />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;