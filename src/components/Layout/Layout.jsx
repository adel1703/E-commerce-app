// Layout.js
import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import layoutCss from './layout.module.css';

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
