import TripCard from './TripCard';
import AddTripModal from './AddTripModal';
// react
import { useState, useEffect } from 'react';
// database
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database'
import { Link } from 'react-router-dom';

function Dashboard() {

    const [addModal, setAddModal] = useState(false);
    const [trips, setTrips] = useState([]);

    // add new trip form modal toggle
    const toggleAddModal = (e) => {
        e.preventDefault();
        setAddModal( !addModal );
    }

    // setting up connection to firebase & updating trips collection
    useEffect( () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        // firebase listener to track db changes
        // returns a function that (when called) removes the listener
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const tripsCollection = [];
            const tripsData = snapshot.val();

            if (tripsData) {
                for (let key in tripsData){
                tripsCollection.push({
                    key: key, 
                    city: tripsData[key].city,
                    itinerary: tripsData[key].itinerary, 
                    activities: tripsData[key].activities,
                    demo: tripsData[key].demo
                    });
                }        
            }
        
            setTrips(tripsCollection);
        })

        // disconnect firebase listener from database upon dismounting to prevent memory leak
        return () => {
        unsubscribe();
        }
        // empty dependency array to call onValue() only when component mounts, so the connection to db is made and can persist until component dismount
    }, [])

    // UPDATE CARD FUNCTION (TO DO)
    
    return (
        <section className="dashboard wrapper">
            <button 
            onClick={toggleAddModal}
            className="addTripBtn"
            >
                Add A Trip
            </button>  
            {/* ADD NEW ACTIVITY FORM */}
            {
                addModal ?
                ( <AddTripModal 
                    toggleAddModal = {toggleAddModal} 
                />) 
                : null
            }
            <h3>Latest recommendations</h3>
            <h4>Scroll down on each city card to read more! Note that demo cards cannot be deleted.</h4>
            <div className="tripsContainer">
                {                
                    trips.map(trip => {
                        return <TripCard 
                        trip={trip}
                        key={trip.key}
                        />
                    })
                }  
            </div>

            {/* Credits */}
            <div className="siteCredits">
                <p className="credits">
                    Images provided by <a className='footerLink' href="https://unsplash.com/developers"> Unsplash API</a> and profanity filter by <a className='footerLink' href="https://www.purgomalum.com/index.html">PurgoMalum RESTful API.</a>
                </p>
                <p className="credits">
                    Header background provided by <a className='footerLink' href="https://loading.io/"> loading.io</a>
                </p>
                <Link to={`/error`}>
                    <p className='footerLink'>Don't click this 👀</p>
                </Link> 
            </div>
        </section>
    )
}

export default Dashboard;