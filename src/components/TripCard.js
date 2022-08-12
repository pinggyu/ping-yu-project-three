import axios from 'axios';
import { useState, useEffect } from 'react';

function TripCard({ trip }) {

    // const [cityPhoto, setCityPhoto] = useState({});

    // useEffect ( () => {
    //     const apiKey = "w67FDoRaQhOOmrxqoRXzmm-BO60eCrBuYsc59kTGMeo";
    //     axios({
    //         url: 'https://api.unsplash.com/search/photos/',
    //         method: 'GET',
    //         dataResponse: 'json',
    //         params: {
    //         client_id: apiKey,
    //         orientation: 'landscape',
    //         query: trip.city
    //         content_filter: 'high'
    //         }
    //     }).then(response => {
    //         const result = response.data.results;
    //         setCityPhoto(result[0]);
    //         console.log(result);
    //     })
    // }, [])


    return (
        <div className="card">
        <div className="cardPhoto">
            <img src="https://images.unsplash.com/photo-1470181942237-78ce33fec141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDYyMjV8MHwxfHNlYXJjaHwxfHxNb250cmVhbHxlbnwwfDB8fHwxNjYwMjgxNTU2&ixlib=rb-1.2.1&q=80&w=400" alt="landscape photography of skyscrapers" />
        </div>
        <div className="cardText">
            <div className="cardSection">
                <p className='cardLabel'>City</p>
                <p>{trip.city}</p> 
            </div>
            <div className="cardSection">
                <p className='cardLabel'>List Name</p>
            <p>{trip.itinerary}</p>
            </div>
            <div className="activitiesContainer cardSection">
            <p className='cardLabel'>Top activities</p>
            <ul>
                {trip.activities?.map( (activity, index) => {
                return (
                    <li key={index}>- {activity}</li>
                )
                })}
            </ul>
            </div>
        </div>
    </div>
    )
}

export default TripCard;