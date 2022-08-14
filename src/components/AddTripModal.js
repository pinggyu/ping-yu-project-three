// helper functions
import checkValidActivity from "../utils/checkValidActivity";
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCircleMinus, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
// db
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database'
// react
import { useState } from 'react';

function AddTripModal({ toggleAddModal }) {

    // 'activity' state tracks the current activity being entered
    // 'activities' state tracks the current entire array of activities to be added
    // 'editedActivity' state tracks the current activity being edited

    const [city, setCity] = useState("");
    const [itinerary, setItinerary] = useState("");
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState("");
    const [editedActivity, setEditedActivity] = useState("");
    const [editIndex, setEditIndex] = useState("");

    const writeTripData = (e) => {
        if (activities.length === 5) {
            const database = getDatabase(firebase);
            const dbRef = ref(database);
            push(dbRef, {
            "city": city,
            "itinerary": itinerary,
            "activities": activities
            })        
        } else {
            e.preventDefault();
            alert('Please add your 5 top activities.');
        }
    }

    const handleAddActivities = (e) => {
        e.preventDefault();
        if (activities.length < 5 && checkValidActivity(activity)){
            setActivities(activities => [...activities, activity]);
            setActivity(''); 
        } else if (activities.length === 5){
            alert('Please limit your activities to your top 5 only.');
        }
    }

    const deleteActivityValue = (e, indexToDelete) => {
        e.preventDefault();
        setActivities(activities => activities.filter((activity, i) => i !== indexToDelete));
    }

    const editActivityValue = (e, index) => {
        e.preventDefault();
        if (checkValidActivity(editedActivity)) {
            const tempArr = [...activities]
            tempArr[index] = editedActivity;
            setActivities(tempArr);
            setEditIndex("");   
            setEditedActivity("");         
        }
    }

    const handleEditIndex = (e, index) => {
        e.preventDefault();
        setEditIndex(index);
        setEditedActivity(activities[index]);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleItineraryChange = (e) => {
        setItinerary(e.target.value);
    }

    const handleActivityChange  = (e) => {
        setActivity(e.target.value);
    }

    const handleActivityEditChange = (e) => {
        setEditedActivity(e.target.value);        
    }

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
                        required
                    />

                    <label htmlFor="itinerary">List name:</label>
                    <input 
                        className="newTripInput"
                        type="text" 
                        id="itinerary" 
                        onChange={handleItineraryChange} 
                        value={itinerary} 
                        placeholder="e.g. A foodie's dream itinerary!" 
                        required
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
                    <button onClick={handleAddActivities} className="addBtn"> Add </button>
                    </div>
                    <div className="activitiesPreview">
                        <ul className='activitiesToAddList'>
                            {activities.map( (activity, index) => { 
                            return (
                                (editIndex !== index) ?
                                (<li className="activityListItem" key={index}>
                                    <p>{index+1}. {activity}</p>
                                    <div className="activityBtns">
                                        <button className="editBtn"onClick={(e)=> handleEditIndex(e, index)}><FontAwesomeIcon icon={ faPenToSquare } /></button>
                                        <button className="deleteBtn" onClick={(e)=> deleteActivityValue(e, index)}><FontAwesomeIcon icon={faCircleMinus} /></button>                                        
                                    </div>
                                </li>)
                                :
                                (<li className="activityListItem" key={index}>
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
                                        <button className="editActivityBtn"onClick={(e)=> editActivityValue(e, index)}><FontAwesomeIcon icon={ faSquareCheck } /></button>                                  
                                    </div>
                                </li>)                                    
                            )
                            })}
                        </ul>
                    </div>
                    <button onClick={(e) => toggleAddModal(e)} className="cancelBtn"> x </button>
                    <button onClick={writeTripData}> Submit </button>
                </form>
                </div>
            </div>
        </div>    
    ) 
}

export default AddTripModal;