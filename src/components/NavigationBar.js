import { useUserAuth } from '../context/UserAuthContext';
import { useState } from 'react';

function NavigationBar() {

  // get current user logged in
  const { user, logOut } = useUserAuth();
  
  // error state
  const [error, setError] = useState(''); 

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err){
        setError(err.message);
        alert(error);
    }
  }

  return (
    <nav className='wrapper'>
        <p>Logged in as <span className='boldText'>{ user.email ? user.email : 'demo user'}</span></p>
        <button onClick={handleLogout}>Log Out</button>        
    </nav>
  )
}

export default NavigationBar