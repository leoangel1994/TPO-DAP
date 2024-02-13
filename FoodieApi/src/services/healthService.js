const mongoose = require('mongoose');
mongoose.set("strictQuery",false);

// Define your service methods
exports.getHealthCheck = async () => {
  try {
    // Wait for database to connect, logging an error if there is a problem
    await mongoose.connect(process.env.MONGODB_URI);
    return {"status": "UP"};
  }
  catch(error){
    console.log(error);
    return {"status": "DOWN"};
  }
};