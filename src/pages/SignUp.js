import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // getting the sign up function by deconstructing the context object useUserAuth()
  const { signUp, logInAsDemo } = useUserAuth();

  // redirect user to another page
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      await signUp(email, password);
      // redirect user to the login page following a successful sign up
      navigate('/login');
    } catch (err) {
      setError(err.message);
      alert(error);
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      await logInAsDemo();
      // redirect user to the login page
      navigate('/');
    } catch (err) {
      setError(err.message);
      alert(error);
    }
  };

  return (
    <div className="pageWrapper">
      <header className="signUpHeader">
        <div
          className="wrapper"
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-easing="ease"
          data-aos-delay="0"
        >
          <h1>Sign Up</h1>
        </div>
      </header>
      <main>
        <section
          className="signUpBody wrapper"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-easing="ease"
          data-aos-delay="0"
        >
          <form className="signUpForm" onSubmit={handleSubmit}>
            <h3 className="formTitle">Create a new account</h3>
            <div className="subInput">
              <label htmlFor="email">Email</label>
              <input
                className="email"
                type="email"
                id="email"
                onChange={handleEmailChange}
                // value={email}
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
                // value={password}
                placeholder="Your password"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account?{' '}
            <Link to={`/login`} className="underlineLink">
              Log in here
            </Link>
          </p>

          <button className="demoBtn" onClick={(e) => handleDemoSubmit(e)}>
            View Demo
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignUp;
