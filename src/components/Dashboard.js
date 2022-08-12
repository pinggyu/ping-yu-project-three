import TripCard from './TripCard';

function Dashboard({ trips }) {

    return (
        <div className="dashboard">
            <h3>Latest recommendations</h3>
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
        </div>
    )
}

export default Dashboard;