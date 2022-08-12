// styles
import './App.css';
// database
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database'
// react
import { useState, useEffect } from 'react';
// components
import Header from './components/Header';
import AddTripModal from './components/AddTripModal';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {

  const [trips, setTrips] = useState([]);
  const [addModal, setModal] = useState(false);

  // setting up connection to firebase and updating collection of trips, call onValue() only once when the component mounts (since the connection is made and persists) by adding an empty dependency array to useEffect()
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // firebase listener to track db changes, returns a function that (when called) removes the listener
    const unsubscribe = onValue(dbRef,(response) => {
      const tripsCollection = [];
      const tripsData = response.val();

      for (let key in tripsData){
        tripsCollection.push({
          key: key, 
          city: tripsData[key].city,
          itinerary: tripsData[key].itinerary, 
          activities: tripsData[key].activities});
      }

      setTrips(tripsCollection);
    })

    // disconnect firebase listener from database upon dismounting to prevent memory leak
    return () => {
      unsubscribe();
    }
  }, [])

  // add new trip form modal toggle
  const toggleAddModal = (e) => {
    e.preventDefault();
    setModal( !addModal );
  }

  return (
    <div className="App pageWrapper">
      <Header 
      toggleAddModal={toggleAddModal}
      />

      <main>

        {/* ADD NEW ACTIVITY FORM */}
        {
          addModal ?
          ( <AddTripModal 
              toggleAddModal = {toggleAddModal} 
            />) 
          : null
        }
      
        <section className='wrapper'>
          <Dashboard
            trips={trips} 
          />
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default App;
