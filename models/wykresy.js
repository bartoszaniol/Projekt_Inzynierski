const db = require("../utils/database");

module.exports.chartData = () => {
  return new Promise((resolve, reject) => {
    const tempInside = [];
    const humidInside = [];
    const dateInside = [];
    let sql = `SELECT * FROM inside`;
    db.all(sql, (err, rows) => {
      if (err) return console.err(err.message);
      // console.log(rows);
      rows.forEach((row) => {
        tempInside.push(row.temp_value);
        humidInside.push(row.humid_value);
        dateInside.push(row.data);
      });
      const inside = {
        temperature: tempInside,
        humidity: humidInside,
        date: dateInside,
      };
      // console.log(inside);
      resolve(inside);
    });
  })


  
  // const tempSoil = [];
  // const humidSoil = [];
  // const dateSoil = [];
  // const inside = {
  //     temperature: [],
  //     humidity: [],
  //     date: []
  // }
  
};

// sql = `SELECT * FROM soil`;
// db.all(sql, (err,rows) => {
//     if(err) return console.err(err.message);
//     console.log(rows);
//     rows.forEach((row) => {
//         tempInside.push(row.temp_value);
//         humidInside.push(row.humid_value);
//         tempSoil.push(row.data)
//     });
// });

// const Soil = {
//     temperature: tempSoil,
//     humidity: humidSoil,
//     date: dateSoil
// }

// const sql = `SELECT * FROM soil`;
// db.all(sql, (err,rows) => {
//     if(err) return console.err(err.message);
//     rows.forEach((row) => {
//         console.log(row);
//     });
// });
