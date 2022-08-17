import axios from 'axios';
import { useState, useEffect } from 'react';
import objectIsEmpty from '../utils/objectIsEmpty';
import ConfirmModal from './ConfirmModal';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
// database
import { getDatabase, ref, remove } from 'firebase/database';
import firebase from '../firebase';

function TripCard({ trip }) {
  const [cityPhoto, setCityPhoto] = useState({});
  const [confirmModal, setConfirmModal] = useState(false);
  const apiKey = 'w67FDoRaQhOOmrxqoRXzmm-BO60eCrBuYsc59kTGMeo';

  // DELETE CARD FUNCTION
  const handleRemoveTrip = (tripId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${tripId}`);
    remove(dbRef);
  };

  // trigger confirmation
  const toggleConfirmModal = (e) => {
    e.preventDefault();
    setConfirmModal(!confirmModal);
  };

  useEffect(() => {
    axios({
      url: 'https://api.unsplash.com/search/photos/',
      method: 'GET',
      dataResponse: 'json',
      params: {
        client_id: apiKey,
        orientation: 'landscape',
        query: trip.city,
        content_filter: 'high',
      },
    })
      .then((response) => {
        const result = response.data.results;
        if (result.length !== 0) {
          setCityPhoto(result[0]);
        } else {
          setCityPhoto({});
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made, server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // request made, no response
          console.log(error.request);
        } else {
          // request didn't go through
          console.log('Error', error.message);
        }
      });
  }, [trip.city]);

  return (
    <div className="card" data-aos="fade-up" data-aos-duration="1200" data-aos-easing="ease" data-aos-delay="0">
      <div className="cardPhoto">
        {!objectIsEmpty(cityPhoto) ? (
          <img src={cityPhoto.urls.small} alt={cityPhoto.alt_description} />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDYyMjV8MHwxfHNlYXJjaHw3fHx0cmF2ZWxsaW5nfGVufDF8MHx8fDE2NjA1MzY3MTg&ixlib=rb-1.2.1&q=80&w=400"
            alt="man sitting on gang chair with feet on luggage looking at airplane"
          />
        )}
      </div>
      <div className="cardText">
        <div className="cardSection">
          <p className="cardLabel">City</p>
          <p>{trip.city}</p>
        </div>
        <div className="cardSection">
          <p className="cardLabel">List Name</p>
          <p>{trip.itinerary}</p>
        </div>
        <div className="activitiesContainer cardSection">
          <p className="cardLabel activitiesLabel">Top activities</p>
          <ul className="activitiesList">
            {trip.activities?.map((activity, index) => {
              return (
                <li className="activitiesListItem" key={index}>
                  {activity}
                </li>
              );
            })}
          </ul>
        </div>

        {trip.demo ? (
          <p className="demoTag">Demo</p>
        ) : (
          <div className="editCardOptions">
            {/* EDIT BUTTONS COMMENTED OUT - THIS FUNCTION WILL BE IMPLEMENTED LATER */}
            {/* <button className="editSubmitBtn"><FontAwesomeIcon icon={ faSquareCheck } /></button>      */}
            {/* <button className="editBtn"><FontAwesomeIcon icon={ faPenToSquare } /></button> */}
            <button className="deleteBtn" onClick={(e) => toggleConfirmModal(e)}>
              <FontAwesomeIcon icon={faCircleMinus} />
            </button>
          </div>
        )}
        {confirmModal ? (
          <ConfirmModal
            toggleConfirmModal={toggleConfirmModal}
            handleRemoveTrip={handleRemoveTrip}
            tripKey={trip.key}
          />
        ) : null}
      </div>
    </div>
  );
}

export default TripCard;
