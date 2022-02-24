const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./dane.db", sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.err(err);
    // console.log("Ok");
})


const sql = `SELECT * FROM dane`;

db.all(sql, (err,rows) => {
    if(err) return console.err(err.message);
    rows.forEach((row) => {
        console.log(row);
    });
});


db.close((err) => {
    if(err) return console.err(err.message);
});