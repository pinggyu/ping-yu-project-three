import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="pageWrapper">
        <header>
          <h1 className='loginHeader'>Login</h1>
        </header>
        <main>
          <Link to={`/`}>
            <button>Back to Demo</button>
          </Link> 
        </main>
        <Footer />
    </div>
  )
}

export default Login;