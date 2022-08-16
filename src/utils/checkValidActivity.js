// This helper function checks if an activity is within 60 characters and is not empty before being added to the DB
const checkValidActivity = (str) => {
    // invalid if string only contains spaces or is empty
    if (str === "" || !(str.replace(/\s/g, '').length) || str.length > 60) {
        alert('Please ensure you have not submitted an empty input and limit each input to 60 characters.');  
        return false;
    } else {
        return true;
    }
}

export default checkValidActivity;