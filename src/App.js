import './App.css';
import firebase from './firebase';
import axios from 'axios';
import { getDatabase, ref, onValue, push } from 'firebase/database'
import { useState, useEffect } from 'react';
import formModal from './components/formModal';
import earth from "./images/earth.svg";

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
      <header>
        <div className="headerContainer wrapper">
          <div className="headerTextContainer">
            <h1>Travel Sheets</h1>
            <h2>A travel itinerary board to inspire you on your next destination.</h2>
            <h3>What are your favourite cities and most memorable things to do in those cities? Contribute to the board below ↓ </h3>            
          </div>
          <div className="imgContainer">
            <img src={earth} alt="Animated picture of the earth" />
          </div>
          <button 
          onClick={toggleAddModal}
          className="addTripBtn"
          >
            Contribute
          </button>
        </div>
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
                <input type="text" id="city" onChange={handleCityChange} value={city} placeholder="e.g. Toronto" required/>
                <label htmlFor="itinerary">List name:</label>
                <input type="text" id="itinerary" onChange={handleItineraryChange} value={itinerary} placeholder="e.g. A foodie's dream itinerary!" required/>
                <label htmlFor="activities" value={activity}>Top activities:</label>
                <div className="activitiesInput">
                  <input type="text" id="activities" onChange={handleActivitiesChange} placeholder="e.g. Dinner at Gyubee Japanese Grill, ..." required/>
                  <button onClick={handleAddActivities} className="addBtn">Add</button>
                </div>
                <button
                onClick={toggleAddModal}
                className="cancelBtn"
                >
                  x
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
                    <div className="activitiesContainer">
                      <p>Top activities:</p>
                      <ul>
                        {trip.activities?.map( activity => {
                          return (
                            <li>{activity}</li>
                          )
                        })}
                      </ul>
                    </div>
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
