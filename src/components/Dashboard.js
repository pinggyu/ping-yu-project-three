import TripCard from './TripCard';
import AddTripModal from './AddTripModal';
// react
import { useState, useEffect } from 'react';
// database
import firebase from '../firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database'

function Dashboard() {

    const [addModal, setModal] = useState(false);
    const [trips, setTrips] = useState([]);

    // add new trip form modal toggle
    const toggleAddModal = (e) => {
    e.preventDefault();
    setModal( !addModal );
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

    // DELETE CARD FUNCTION
    const handleRemoveTrip = (tripId) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${tripId}`)
        remove(dbRef);
    }

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
            <div className="tripsContainer">
                {                
                    trips.map(trip => {
                        return <TripCard 
                        trip={trip}
                        key={trip.key}
                        handleRemoveTrip={handleRemoveTrip}
                        />
                    })
                }  
            </div>          
        </section>
    )
}

export default Dashboard;