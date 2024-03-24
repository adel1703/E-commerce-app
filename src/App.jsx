import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import NotFound from './components/NotFound';
import AuthContextProvider from './context/AuthContext';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Orders from './components/Orders/Orders';
import Profile from './components/Profle/Profile';
import { Offline } from 'react-detect-offline';
import CashPayment from './components/Payment/CashPayment';
import OnlinePayment from './components/OnlinePayment/OnlinePayment';
import SpecificCategory from './components/SpecificCategory/SpecificCategory';
import SpecificBrand from './components/specificBrand/SpecificBrand';
import Whishlist from './components/Whishlist/Whishlist';
import WishlistContextProvider from './context/WishlistContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Verifing from './components/Verifing/Verification';
import ResetPassword from './components/ResetPassword/ResetPassword';

const projectRouter = createBrowserRouter([
  {path: '/' , element:<Layout/> , children: [
    {index : true , element: <Login /> },
    {path: 'register' , element: <Register /> },
    {path: 'login' , element: <Login />},
    {path: 'Forgot password' , element: <ForgotPassword />},
    {path: 'verifing' , element: <Verifing />},
    {path: 'reset-password' , element: <ResetPassword />},
    {path: 'products' , element:<ProtectedRoute> <Products /> </ProtectedRoute> },
    {path: 'productDetails/:id' , element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    {path: 'Cart' , element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    {path: 'Categories' , element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    {path: 'Brands' , element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    {path: 'orders' , element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
    {path: 'allorders' , element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
    {path: 'cashPayment' , element: <ProtectedRoute> <CashPayment /> </ProtectedRoute> },
    {path: 'OnlinePayment' , element: <ProtectedRoute> <OnlinePayment /> </ProtectedRoute> },
    {path: 'userProfile' , element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
    {path: 'specificCategory/:_id' , element: <ProtectedRoute> <SpecificCategory /> </ProtectedRoute> },
    {path: 'specificBrand/:_id' , element: <ProtectedRoute> <SpecificBrand /> </ProtectedRoute> },
    {path: 'whishlist' , element: <ProtectedRoute> <Whishlist /> </ProtectedRoute> },

    

    {path : '*' , element : <NotFound />}
  ]},
  
])

export default function App() {
  const myClient = new QueryClient();
  return <>
    <QueryClientProvider client={myClient}>
    <AuthContextProvider>
    <CartContextProvider > 
    <WishlistContextProvider>
    <RouterProvider router={ projectRouter } />
    </WishlistContextProvider>
    </CartContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    <Toaster />

    <Offline>
      <div className='bg-danger ps-1 fixed-bottom text-white'>No internet connection...</div>
    </Offline>

  </>
}
