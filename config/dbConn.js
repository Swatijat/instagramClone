const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

const connectDb = async () => {
  try {
    const result = await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (result) console.log("conneted to mongo yeahh");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDb;
