const mongoose = require('mongoose');

// Define your service methods
exports.getHealthCheck = async () => {
  try {
    if (mongoose.connection.readyState in [1,2])
      return {"status": "UP"};
    return {"status":"DOWN", "state": mongoose.connection.readyState}
  }
  catch(error){
    console.log(error);
    return {"status": "DOWN"};
  }
};