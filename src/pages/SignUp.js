import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    // getting the sign up function by deconstructing the context object useUserAuth()
    const { signUp } = useUserAuth();

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
            await signUp(email, password);
            // redirect user to the login page following a successful sign up
            navigate('/login');

        } catch (err){
            setError(err.message);
            alert(err);
        }
    }

    return (
    <div className="pageWrapper">
        <header>
            <h1>Sign Up</h1>
        </header>
        <main>
            <section className="signUpBody">
                <form className="signUpForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        className="email"
                        type="email" 
                        id="email" 
                        onChange={handleEmailChange} 
                        // value={email} 
                        placeholder="Your email address" 
                        required
                    />
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
                    <button type='submit'>Sign Up</button>
                </form>
            </section>
            <p>Already have an account?</p>
            <Link to={`/login`}>
                <button>Log In</button>
            </Link> 
            <Link to={`/`}>
                <button>View Demo</button>
            </Link> 
        </main>
        <Footer />
    </div>
    )
}

export default SignUp;