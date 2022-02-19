const express = require('express');
const Datastore = require('nedb');

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

app.use(express.static('client'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('leaderboard.db');
database.loadDatabase();

app.post("/leaderboard", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.get('/leaderboard', (request, response) => {
    database.find({}).sort({ score: -1 }).exec((err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            response.json(data);
            console.log(data);
        }
    });
})