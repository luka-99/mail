const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoConnect = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const session = expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoConnect.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbconnect' }),
});
app.use(session);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});