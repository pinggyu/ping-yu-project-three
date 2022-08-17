// LINK TO THIS PAGE AND CONTENT WILL BE IMPLEMENTED LATER

import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function TripDetails() {
  return (
    <div className="pageWrapper">
      <header>
        <h1 className="tripDetailsHeader">Trip Details</h1>
      </header>
      <main>
        <Link to={`/`}>
          <button>Back to Home</button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default TripDetails;
