// Layout.js
import React from 'react';
import Footer from '../Footer/Footer';
import layoutCss from './layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className={layoutCss.layout}>
      <Navbar />
      <div >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
