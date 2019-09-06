const spicedPg 			= require('spiced-pg');

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require('./secret');
    // db = spicedPg(`postgres:postgres:postgres@localhost:5432/signers`);
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/socialability`); // more secure option to login
}

exports.registerUser = (name, surname, email, password) => {
    return db.query(
        `INSERT INTO userlist (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`, //$1, $2 ... very important
        [name, surname, email, password]
    );
};

exports.getPassword = email => {
    return db
        .query(
            `SELECT password, id FROM userlist WHERE email=$1`,
            [email]
        )
        .then(({ rows }) => {
            return rows;
        });
};
