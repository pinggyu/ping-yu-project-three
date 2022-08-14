const checkValidActivity = (str) => {
    // invalid if string only contains spaces or is empty
    if (str === "" || !(str.replace(/\s/g, '').length) || str.length > 40) {
        alert('Please ensure you have not submitted an empty input and limit each input to 40 characters.');  
        return false;
    } else {
        return true;
    }
}

export default checkValidActivity;