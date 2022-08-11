import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database'
import { useState, useEffect } from 'react';
import formModal from './components/formModal';

function App() {

  const [trips, setTrips] = useState([]);
  const [addModal, setModal] = useState(false);
  const [city, setCity] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");

  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef,(response) => {
      const tripsCollection = [];
      const tripsData = response.val();

      for (let key in tripsData){
        tripsCollection.push({key: key, city: tripsData[key].city, itinerary: tripsData[key].itinerary, activities: tripsData[key].activities});
      }

      setTrips(tripsCollection);
    })
  }, [])


  const writeTripData = (e) => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, {
      "city": city,
      "itinerary": itinerary,
      "activities": activities
    })
  }

  const handleAddActivities = (e) => {
    e.preventDefault();
    activities.push(activity);
    setActivity('');
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleItineraryChange = (e) => {
    setItinerary(e.target.value);
  }

  const handleActivitiesChange  = (e) => {
    e.preventDefault();
    setActivity(e.target.value);
  }

  const toggleAddModal = (e) => {
    e.preventDefault();
    setModal( !addModal );
  }

  return (
    <div className="App">
      <header className='wrapper'>
        <h1>Travel Sheets</h1>
        <h2>A travel itinerary board to inspire you on your next destination.</h2>
        <button 
        onClick={toggleAddModal}
        >
          New trip
        </button>
      </header>

      <main>
        <>
        {
          addModal ?
          (<div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <form className="addForm">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" onChange={handleCityChange} value={city}/>
                <label htmlFor="itinerary">Itinerary name:</label>
                <input type="text" id="itinerary" onChange={handleItineraryChange} value={itinerary}/>
                <label htmlFor="activities" value={activity}>Activities:</label>
                <div className="activitiesInput">
                  <input type="text" id="activities" onChange={handleActivitiesChange}/>
                  <button onClick={handleAddActivities}>Add</button>
                </div>
                <button
                onClick={toggleAddModal}
                className="cancelBtn"
                >
                  Cancel
                </button>
                <button onClick={writeTripData}>Submit</button>
              </form>
            </div>
          </div>
        </div>) : null
        }
        </>
      
        <section className='dashboard wrapper'>
          <h3>Latest recommendations</h3>
          <div className="tripsContainer">
            {
              trips.map(trip => {
                return (
                  <div className="card" key={trip.key}>
                    <p>{trip.city}</p>
                    <p>{trip.itinerary}</p>
                    <p>{trip.activities}</p>
                  </div>
                )
              })
            }            
          </div>
        </section>

      </main>

      <footer>
        © 2022 - Made by Ping Yu at Juno College
      </footer>

    </div>
  );
}

export default App;
