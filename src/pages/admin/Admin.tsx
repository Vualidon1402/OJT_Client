import React from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import './admin.scss';

export default function Admin() {
  return (
    <div id="admin_container">
      <Navbar></Navbar>
      <Body></Body>
    </div>
  );
}
