import React from 'react';
// components
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

function Main() {
  return (
    <>
        <Header /> 
        <main>
        <div className="pageWrapper">
            <Dashboard/>
        </div> 
        </main>
        <Footer />
    </>
  )
}

export default Main;