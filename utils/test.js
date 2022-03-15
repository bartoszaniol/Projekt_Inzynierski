const db = require('./database');
const bcrypt = require('bcryptjs');


// db.run(`CREATE TABLE users(username, password)`);

// const addToDb = async () => {
//     const hashedPassword = await bcrypt.hash('test', 10);
//     const sql = `INSERT INTO users (username, password) VALUES(?,?)`
//     console.log(hashedPassword);
//     db.run(sql,["Bartek", hashedPassword])

//     db.close((err)=> {
//         if (err) return console.error(err.message);
//     });
// }


// addToDb();