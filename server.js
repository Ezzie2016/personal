const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://127.0.0.1:27017/onsiteDB',)
    try {
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }

//define a schema
const userSchema = new mongoose.Schema({
    title: String,
    genre: String,
    release_year: Number,
    director: String
});

//create a model
const User = new mongoose.model('User', userSchema);
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', (req, res) => {
    const { title, genre, release_year, director } = req.body;

    try {
        const user = new User({
            title: title,
            genre: genre,
            release_year: release_year,
            director: director
        });
        user.save();
        console.log("User saved to database");
        res.send("User saved to database");
    } catch (error) {
        console.log("Error saving user to database:, ${error}");
        res.senf("Error saving user to database");
    }
});

app.listen(port, () => 
    console.log(`Server is running on http://localhost:${port}`));
