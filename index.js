require('dotenv').config()
const express = require('express');
const cors = require('cors');

//Initialize App
const app = express();

app.use(cors());

app.use(express.json({extended: false}))

app.use('/api/contact', require('./routes/api/contact'))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});