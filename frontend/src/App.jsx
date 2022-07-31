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
import Infos from './pages/Infos';
import Purchase from './pages/Purchase';
import Search from './pages/Search';
import Orders from './pages/Orders';

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
        <Route path='/infos' element={<Infos />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;