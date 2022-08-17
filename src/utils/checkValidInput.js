// This helper function checks if a city, list name or activity input is within limit characters and is not empty before being added to the DB
const checkValidInput = (str) => {
    // invalid if string only contains spaces or is empty
    if (str === "" || !(str.replace(/\s/g, '').length) || str.length > 35) {
        alert('Please ensure you have not submitted an empty input and limit each input to 35 characters.');  
        return false;
    } else {
        return true;
    }
}

export default checkValidInput;