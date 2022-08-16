// styles
import './App.css';
// animations
import AOS from 'aos';
import 'aos/dist/aos.css';
// router
import { Routes, Route } from "react-router-dom";
// pages
import Main from './pages/Main';
import TripDetails from './pages/TripDetails';
import Login from './pages/Login';

function App() {

  AOS.init();

  return (

    <Routes>
      <Route path='/' element= { <Main /> } ></Route>
      <Route path='/login' element= { <Login /> } ></Route>
      <Route path='/trip/:tripId' element= {<TripDetails />} ></Route>
    </Routes>

  );
}

export default App;
