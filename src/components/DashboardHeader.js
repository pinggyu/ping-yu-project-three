import earth from "../images/earth.svg";
import { useUserAuth } from '../context/UserAuthContext';
import { useState } from 'react';

function DashboardHeader() {

  // get current user logged in
  const { user, logOut } = useUserAuth();
  console.log(user)
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
      <header>
        <div className="headerContainer wrapper">
          <div className="headerTextContainer">
            <p>You are signed in as { user.email ? user.email : 'demo user'}</p>
            <button onClick={handleLogout}>Log Out</button>
            <h1>Travel Sheets</h1>
            <h2>A travel itinerary board to inspire you on your next destination.</h2>
            <p>What are your favourite cities and the top 5 most memorable things to do there? Add it below and help others plan for their next trip ↓ </p>        
          </div>
          <div className="imgContainer headerImg" data-aos='zoom-in' data-aos-duration='1200' data-aos-easing='ease' data-aos-delay="0">
            <img src={earth} alt="The earth" />
          </div>
        </div>
      </header>
  )
}

export default DashboardHeader;