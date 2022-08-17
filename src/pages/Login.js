import { useState } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    // getting the sign up function by deconstructing the context object useUserAuth()
    const { logIn, logInAsDemo } = useUserAuth();

    // redirect user to another page
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {
            await logIn(email, password);
            // redirect user to the login page following a successful sign up
            navigate('/');

        } catch (err){
            setError(err.message);
            alert(error);
        }
    }

    const handleDemoSubmit = async (e) => {
      e.preventDefault();

      setError('');

      try {
          await logInAsDemo();
          // redirect user to the login page
          navigate('/');

      } catch (err){
          setError(err.message);
          alert(error);
      }
    }
  
  return (
    <div className="pageWrapper">
        <header className='loginHeader'>
            <div className="wrapper" data-aos='fade-down' data-aos-duration='1200' data-aos-easing='ease' data-aos-delay="0">
                <h1>Travel Sheets</h1>
                <h2>A travel itinerary board to inspire you on your next destination.</h2>  
            </div>
        </header>

        <main>
            <section className="loginBody wrapper" data-aos='fade-up' data-aos-duration='1200' data-aos-easing='ease' data-aos-delay="0">

                <form className="loginForm" onSubmit={handleSubmit}>
                    <h3 className='formTitle'>Log In</h3>
                    <div className="subInput">
                        <label htmlFor="email">Email</label>
                        <input 
                            className="email"
                            type="email" 
                            id="email" 
                            onChange={handleEmailChange} 
                            value={email} 
                            placeholder="Your email address" 
                            required
                        />
                    </div>

                    <div className="subInput">
                        <label htmlFor="password">Password</label>
                        <input 
                            className="password"
                            type="password" 
                            id="password" 
                            onChange={handlePasswordChange} 
                            value={password} 
                            placeholder="Your password" 
                            required
                        />
                    </div>
                    <button type='submit'>Log In</button>
                </form>

                <p>Don't have an account yet? <Link to={`/signup`} className="underlineLink">Sign up now</Link> </p>
                
                <button className='demoBtn' onClick={(e) => handleDemoSubmit(e)}>View Demo</button>

            </section>
        </main>
        <Footer />
    </div>
  )
}

export default Login;