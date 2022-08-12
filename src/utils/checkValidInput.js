const checkValidInput = (str) => {
    // invalid if string only contains spaces or is empty
    if (str === "" || !(str.replace(/\s/g, '').length)) {
        return false;
    } else {
        return true;
    }
}

export default checkValidInput;