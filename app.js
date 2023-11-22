//hello farhan
const express = require('express');
const cors = require('cors')
const app = express();
// const port = 3000;
// if running react concurrently
const port = 3001;

// const dataInit = require('./dataInit');

app.use(cors())
app.use(express.json())

const Transfer = require('./Transfer') ;
app.use('/Transfer', Transfer);

const Payment = require('./Payment') ;
app.use('/Payment', Payment);

app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});
