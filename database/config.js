const mongosee = require("mongoose");

const dbConnection = async () => {
  try {
    await mongosee.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error("Ocurrio un error");
  }
};
module.exports = {
  dbConnection,
};
