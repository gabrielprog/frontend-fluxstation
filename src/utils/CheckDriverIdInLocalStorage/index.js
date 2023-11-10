function checkDriverIdInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
     const driverId = localStorage.getItem('driverId');
  
      if (driverId) {
        console.log('DriverId found:', driverId);
        return true;
      } else {
        console.log('DriverId not found in localStorage');
        return false;
      }
    } else {
      console.error('localStorage not supported in the browser.');
      return false;
    }
}

module.exports = checkDriverIdInLocalStorage();