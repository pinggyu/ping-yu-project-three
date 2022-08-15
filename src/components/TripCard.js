import axios from 'axios';
import { useState, useEffect } from 'react';

function TripCard({ trip }) {

    const [cityPhoto, setCityPhoto] = useState({});
    const apiKey = "w67FDoRaQhOOmrxqoRXzmm-BO60eCrBuYsc59kTGMeo";

    // checks if object is empty
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    useEffect ( () => {
        axios({
            url: 'https://api.unsplash.com/search/photos/',
            method: 'GET',
            dataResponse: 'json',
            params: {
                client_id: apiKey,
                orientation: 'landscape',
                query: trip.city,
                content_filter: 'high'
            }
        }).then(response => {
            const result = response.data.results;
            if (result.length !== 0) {
                setCityPhoto(result[0]);
            } else {
                setCityPhoto({});
            }
        })
    }, [])


    return (
        <div className="card" data-aos='fade-up' data-aos-duration='1200' data-aos-easing='ease' data-aos-delay="0">
        <div className="cardPhoto">
            {
                !isEmpty(cityPhoto) ? <img src={cityPhoto.urls.small} alt={cityPhoto.alt_description} /> : <img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDYyMjV8MHwxfHNlYXJjaHw3fHx0cmF2ZWxsaW5nfGVufDF8MHx8fDE2NjA1MzY3MTg&ixlib=rb-1.2.1&q=80&w=400" alt="man sitting on gang chair with feet on luggage looking at airplane" />
            }
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
                    <li className="activitiesListItem" key={index}>- {activity}</li>
                )
                })}
            </ul>
            </div>
        </div>
    </div>
    )
}

export default TripCard;