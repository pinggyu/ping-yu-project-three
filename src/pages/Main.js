import React from 'react';
// components
import DashboardHeader from '../components/DashboardHeader';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

function Main() {
  return (
    <>
      <DashboardHeader />
      <main>
        <div className="pageWrapper">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
