const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');

mongoose.connect('mongodb+srv://asouvignet2:AxUllgqFMJLCk1GQ@cluster1.djkzh50.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);
    user.save()
        .then(
            () => {
                res.status(201).json({
                    message: 'Utilisateur enregistré dans la base de données.'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
});


app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'LogIn réussi !'
    });
});


module.exports = app;