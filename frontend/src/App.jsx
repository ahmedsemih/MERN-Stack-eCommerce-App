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
import OrdersforAdmin from './pages/OrdersforAdmin';
import CategoriesforAdmin from './pages/CategoriesforAdmin';
import ProductsforAdmin from './pages/ProductsforAdmin';
import ReportsforAdmin from './pages/ReportsforAdmin';
import ImagesforAdmin from './pages/ImagesforAdmin';
import { useUserContext } from './contexts/UserContext';
import useGetUserRole from './hooks/useGetUserRole';

const App = () => {

  const { currentUser } = useUserContext();
  const [admin] = useGetUserRole(currentUser);

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
        <Route path='/infos' element={currentUser ? <Infos /> : <Navigate to='/' />} />
        <Route path='/orders' element={currentUser ? <Orders /> : <Navigate to='/' />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/search' element={<Search />} />
        <Route path='/payment' element={<Payment />} />
        {
            admin
            ?
            <>
              <Route path='/admin/products' element={<ProductsforAdmin />} />
              <Route path='/admin/categories' element={<CategoriesforAdmin />} />
              <Route path='/admin/orders' element={<OrdersforAdmin />} />
              <Route path='/admin/images' element={<ImagesforAdmin />} />
              <Route path='/admin/reports' element={<ReportsforAdmin />} />
            </>
            :
            <Route path='/admin/*' element={<Navigate to='/' />} />
        }
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;