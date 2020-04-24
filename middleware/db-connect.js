const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
