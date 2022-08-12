import './App.css';
import firebase from './firebase';
import axios from 'axios';
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react';
import FormModal from './components/FormModal';
import earth from "./images/earth.svg";

function App() {

  const [trips, setTrips] = useState([]);
  const [addModal, setModal] = useState(false);

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

  const toggleAddModal = (e) => {
    e.preventDefault();
    setModal( !addModal );
  }

  return (
    <div className="App pageWrapper">
      <header>
        <div className="headerContainer wrapper">
          <div className="headerTextContainer">
            <h1>Travel Sheets</h1>
            <h2>A travel itinerary board to inspire you on your next destination.</h2>
            <p>What are your favourite cities and the 5 most memorable things to do in those cities? Contribute to the board below ↓ </p>    
            <button 
            onClick={toggleAddModal}
            className="addTripBtn"
            >
              Contribute
            </button>        
          </div>
          <div className="imgContainer">
            <img src={earth} alt="The earth" />
          </div>
        </div>
      </header>

      <main>

        {
          addModal ?
          ( <FormModal toggleAddModal = {toggleAddModal}/>) : null
        }
      
        
        <section className='dashboard wrapper'>
          <h3>Latest recommendations</h3>
          <div className="tripsContainer">
            {
              trips.map(trip => {
                return (
                  <div className="card" key={trip.key}>
                    <div className="cardPhoto">
                      
                    </div>
                    <div className="cardText">
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
