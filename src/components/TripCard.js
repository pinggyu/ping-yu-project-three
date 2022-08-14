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
    //             client_id: apiKey,
    //             orientation: 'landscape',
    //             query: trip.city,
    //             content_filter: 'high'
    //         }
    //     }).then(response => {
    //         const result = response.data.results;
    //         setCityPhoto(result[0]);
    //         console.log(result);
    //     })
    // }, [])


    return (
        <div className="card">
        {/* <div className="cardPhoto">
            <img src={cityPhoto.urls.small} alt={cityPhoto.alt_description} />
        </div> */}
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