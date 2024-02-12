// Import any required models here
//const Example = require('../models/example');

// Define your service methods
exports.getHealthCheck = async () => {
  return {"status": "UP"};
};

exports.createExample = async (name) => {
  const example = new Example({ name });
  return await example.save();
};