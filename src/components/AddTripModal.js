// helper functions
import checkValidInput from '../utils/checkValidInput';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleMinus, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
// db
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
// react
import { useState } from 'react';
// axios
import axios from 'axios';

function AddTripModal({ toggleAddModal }) {
  // 'activity' state tracks the current activity being entered
  // 'activities' state tracks the current entire array of activities to be added
  // 'editedActivity' state tracks the current activity being edited

  const [city, setCity] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState('');
  const [editedActivity, setEditedActivity] = useState('');
  const [editIndex, setEditIndex] = useState('');

  // profanity filter API
  const hasProfanity = async (string) => {
    // this variable returns true/false based on whether profanity is detected (true = yes there is)
    const inputHasProfanity = await axios
      .get('https://www.purgomalum.com/service/containsprofanity?text=' + string)
      .then((response) => response.data)
      .catch((error) => console.log('Profanity API Check Failed', error));
    return inputHasProfanity;
  };

  const writeTripData = async (e) => {
    e.preventDefault();
    const cityProfanity = await hasProfanity(city);
    const itineraryProfanity = await hasProfanity(itinerary);

    if (
      activities.length > 0 &&
      !cityProfanity &&
      !itineraryProfanity &&
      checkValidInput(city) &&
      checkValidInput(itinerary)
    ) {
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      push(dbRef, {
        city: city,
        itinerary: itinerary,
        activities: activities,
        demo: false,
      });
      toggleAddModal(e);
    } else if (cityProfanity || itineraryProfanity) {
      alert('Avoid using profanity.');
    } else if (activities.length === 0) {
      alert('Please add at least one activity!');
    }
  };

  const handleAddActivities = async (e) => {
    e.preventDefault();

    const profanity = await hasProfanity(activity);

    if (activities.length < 5 && checkValidInput(activity) && !profanity) {
      setActivities((activities) => [...activities, activity]);
      setActivity('');
    } else if (profanity) {
      alert('Avoid using profanity.');
    } else if (activities.length === 5) {
      alert('Please limit your activities to your top 5 only.');
    }
  };

  const deleteActivityValue = (e, indexToDelete) => {
    e.preventDefault();
    setActivities((activities) => activities.filter((activity, i) => i !== indexToDelete));
  };

  const editActivityValue = (e, index) => {
    e.preventDefault();
    if (checkValidInput(editedActivity)) {
      const tempArr = [...activities];
      tempArr[index] = editedActivity;
      setActivities(tempArr);
      setEditIndex('');
      setEditedActivity('');
    }
  };

  const handleEditIndex = (e, index) => {
    e.preventDefault();
    setEditIndex(index);
    setEditedActivity(activities[index]);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleItineraryChange = (e) => {
    setItinerary(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleActivityEditChange = (e) => {
    setEditedActivity(e.target.value);
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modalContent">
          <form className="addForm">
            <label htmlFor="city">City:</label>
            <input
              className="newTripInput"
              type="text"
              id="city"
              onChange={handleCityChange}
              value={city}
              placeholder="e.g. Toronto"
            />

            <label htmlFor="itinerary">List name:</label>
            <input
              className="newTripInput"
              type="text"
              id="itinerary"
              onChange={handleItineraryChange}
              value={itinerary}
              placeholder="e.g. A foodie's dream itinerary!"
            />

            <label htmlFor="activities">Top activities:</label>
            <div className="activitiesInput">
              <input
                className="newTripInput"
                type="text"
                id="activities"
                onChange={handleActivityChange}
                value={activity}
                placeholder="e.g. Dinner at Gyubee Japanese Grill, ..."
              />

              <button onClick={handleAddActivities} className="addBtn">
                {' '}
                Add{' '}
              </button>
            </div>

            <div className="activitiesPreview">
              <ul className="activitiesToAddList">
                {activities.map((activity, index) => {
                  return editIndex !== index ? (
                    <li className="activityListItem" key={index}>
                      <p>
                        {index + 1}. {activity}
                      </p>
                      <div className="activityBtns">
                        <button className="editBtn" onClick={(e) => handleEditIndex(e, index)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="deleteBtn" onClick={(e) => deleteActivityValue(e, index)}>
                          <FontAwesomeIcon icon={faCircleMinus} />
                        </button>
                      </div>
                    </li>
                  ) : (
                    <li className="activityListItem" key={index}>
                      <label htmlFor="activity"></label>
                      <input
                        className="newTripInput"
                        type="text"
                        id="activity"
                        onChange={handleActivityEditChange}
                        placeholder={activity}
                        value={editedActivity}
                      />
                      <div className="activityBtns">
                        <button className="editSubmitBtn" onClick={(e) => editActivityValue(e, index)}>
                          <FontAwesomeIcon icon={faSquareCheck} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button onClick={(e) => toggleAddModal(e)} className="cancelBtn">
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <button onClick={writeTripData}> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTripModal;
