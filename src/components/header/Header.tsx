import React from 'react'
import Navbar from './components/Navbar';
import Menu from './components/Menu';
export default function Header() {
  return (
    <>
      <div id="container">
        <Navbar />
        <Menu/>
      </div>
    </>
  );
}
