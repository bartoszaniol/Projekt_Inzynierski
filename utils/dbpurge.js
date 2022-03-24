const db = require("./database");

let sql = `DELETE FROM inside WHERE data < ?`
let currDate = new Date()
currDate.setDate(currDate.getDate()-31);
db.all(sql, [currDate.getTime()], (err, rows) => {
    rows.forEach((row) => {
        console.log(`${row.temp_value} ${row.humid_value} ${row.data}`);
    });
  });

sql = `DELETE FROM soil WHERE data < ?`

db.all(sql, [currDate.getTime()], (err, rows) => {
    rows.forEach((row) => {
        console.log(`${row.temp_value} ${row.humid_value} ${row.data}`);
    });
});