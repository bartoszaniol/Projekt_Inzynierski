const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./inz.db", sqlite3.OPEN_READONLY, (err) => {
//   if (err) return console.err(err);
//   // console.log("Ok");
// });

const db = new sqlite3.Database("/home/pi/Desktop/Inz/inz.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.err(err);
  // console.log("Ok");
});

module.exports = db;

// const sql = `SELECT * FROM inside`;

// db.all(sql, (err,rows) => {
//     if(err) return console.err(err.message);
//     rows.forEach((row) => {
//         console.log(row);
//     });
// });

// db.close((err) => {
//     if(err) return console.err(err.message);
// });
