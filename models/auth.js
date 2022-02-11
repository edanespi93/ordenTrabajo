const { Schema, model } = require("mongoose");

const authShema = Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
  },
});

module.exports = model("Auth", authShema);
