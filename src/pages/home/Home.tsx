import Footer from '@pages/home/pages/components/footer/Footer';
import Header from '@pages/home/pages/components/header/Header';
import React from 'react'
import { Outlet } from 'react-router-dom';
import './home.scss';

export default function Home() {
  return (
    <div className="home_page">
      <Header />
      <div className="content_wrapper">
        <div className="content_container">
          <div className="home_page_container">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
