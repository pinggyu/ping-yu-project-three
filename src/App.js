// styles
import './App.css';
// animations
import AOS from 'aos';
import 'aos/dist/aos.css';
// router
import { Routes, Route} from "react-router-dom";
// pages
import Main from './pages/Main';
// import TripDetails from './pages/TripDetails';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {

  AOS.init();

  return (
    <UserAuthContextProvider>
      <Routes>

        {/* Default route is login (sign up page can be accessed via login and vice versa) */}
        <Route path='/login' element= { <Login /> } />
        <Route path='/signup' element= { <SignUp/> } />

        {/* Only when logged in */}
        <Route path='/' element= { 
          <ProtectedRoute> 
            <Main /> 
          </ProtectedRoute> 
        } />

        {/* Accessed via dashboard - TO BE IMPLEMENTED */}
        {/* <Route path='/trip/:tripId' element= {<ProtectedRoute> <TripDetails /> </ProtectedRoute> } /> */}

        {/* Any other route redirects to error */}
        <Route path="*" element = { <ErrorPage /> } ></Route>

      </Routes>
    </UserAuthContextProvider>
  );
}



export default App;
