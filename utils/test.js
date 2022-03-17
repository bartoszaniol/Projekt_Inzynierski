const db = require('./database');
const bcrypt = require('bcryptjs');


// db.run(`CREATE TABLE users(username, password)`);

const addToDb = async () => {
    // const hashedPassword = await bcrypt.hash('test', 10);
    // const sql = `INSERT INTO users (username, password) VALUES(?,?)`
    // console.log(hashedPassword);
    // db.run(sql,["Bartek", hashedPassword])

    let sql = `SELECT *
            FROM inside
            WHERE temp_value > ?`;

    db.all(sql, ['21'], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
            console.log(`${row.temp_value} ${row.humid_value}`);
        });
      });




    db.close((err)=> {
        if (err) return console.error(err.message);
    });
}


addToDb();