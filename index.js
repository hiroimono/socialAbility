const express 				= require('express');
const app 					= express();
const compression 			= require('compression');
const db					= require('./utils/db');
const { hash, compare }		= require('./utils/bc');
const csurf 				= require('csurf');

app.use(compression());

app.use(express.static('public'));
app.use(express.json());

app.use(require('cookie-session')({
    maxAge:	1000 * 60 * 60 * 24 * 365.25 * 1000,
    secret: process.env.NODE_ENV == 'production' ?
        process.env.SESS_SECRET :
        require('./utils/secret').sessionSecret
}));

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

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
                .then(({rows}) => {
                    console.log("Assigned information for new user: ", rows);
                    res.json(rows);
                })
                .catch(err => {
                    console.log('/register, POST request error: ', err);
                });
        })
        .catch( err => console.log('/register, hash error: ', err));
});

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    db.getPassword( email )
        .then(result => {
            compare(password, result[0].password)
                .then(match => {
                    if(match){
                        console.log('user logged in!!!');
                        res.json(result.rows);
                        // req.session.userID = result[0].id;
                        // console.log('req.session userID: ', req.session.userID);
                        // req.session.LOGIN= true;
                        // db.getSignature(result[0].id)
                        //     .then((rows) => {
                        //         req.session.signatureID = rows.id;
                        //         console.log('req.session signatureID: ', req.session.signatureID);
                        //         console.log('User now login. req.session.LOGIN: ', req.session.LOGIN);
                        //         res.render('signed-thanks', {
                        //             layout:'main2',
                        //             name: rows.name,
                        //             surname: rows.surname,
                        //             signature: rows.signature
                        //         });
                        //     })
                        // .catch(err => {
                        //     console.log('req.session userID: ', req.session.userID);
                        //     console.log('req.session signatureID: ', req.session.signatureID);
                        //     console.log('req.session.LOGIN: ', req.session.LOGIN);
                        //     console.log('User did not yet signed the petition: ', err);
                        //     res.redirect('/petition/1');
                        // });
                    } else {
                        res.render('signin', {
                            errors: 'Sign in failed! Please try again.'
                        });
                    }
                })
                .catch( err => {
                    console.log('Login page error: ', err);
                    // res.render('signin', {
                    //     errors: 'Sign in failed! Please try again.'
                    // });
                });
        })
        .catch( err => {
            console.log('Login page error: ', err);
            // res.render('signin', {
            //     layout: 'main',
            //     errors: 'Login failed! Please try again.'
            // });
        });
});


//every other routes comes before this
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Port ${PORT} is listening very carefully!!!...`));
