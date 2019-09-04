const express 				= require('express');
const app 					= express();
const compression 			= require('compression');
const db					= require('./utils/db');
const { hash, compare }		= require('./utils/bc');

app.use(compression());

app.use(express.static('public'));
app.use(express.json());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post('/register', (req, res) => {
    console.log(req.body);
    var { name, surname, email, password } = req.body;
    hash(password)
        .then( hash => {
            console.log("hashed password is: ", hash);
            db.registerUser(
                name,
                surname,
                email,
                hash
            )
                .then((data) => {
                    console.log("Assigned information for new user: ", data.rows);
                    res.json(data.rows);
                    location.replace('/');
                })
                .catch(err => {
                    console.log('/register, POST request error: ', err);
                });
        })
        .catch( err => console.log('/register, hash error: ', err));
});

//every other routes comes before this
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
