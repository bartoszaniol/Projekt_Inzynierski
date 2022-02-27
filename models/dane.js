const db = require("../utils/database");

module.exports.getLastData = () => {
  return new Promise((resolve, reject) => {
    const returnValue = {};
    let sql = 'SELECT * FROM inside ORDER BY data DESC LIMIT 1 ';
    db.all(sql, (err, rows) => {
      if (err) return console.err(err.message);
      rows.forEach((row) => {
        // console.log(row)
        returnValue.insideTemp = row.temp_value;
        returnValue.insideHumid = row.humid_value;
        let returnDate = new Date(parseFloat(row.data));
        returnValue.insideDate = `${returnDate.toLocaleString()}`;
      });
      db.all('SELECT * FROM soil ORDER BY data DESC LIMIT 1', (err, rows) => {
        rows.forEach((row) => {
          returnValue.soilTemp = row.temp_value;
          returnValue.soilHumid = row.humid_value;
          returnDate = new Date(parseFloat(row.data));
          returnValue.soilDate = `${returnDate.toLocaleString()}`;
        })
        resolve(returnValue);
      });
    });
    // let sql = 'SELECT * FROM soil DESC LIMIT 1';
    // db.all(sql, (err, rows) => {
    //   if (err) return console.err(err.message);
    //   rows.forEach((row) => {

    //   });
    // });
    
  })
}

module.exports.getCharts = () => {
  return new Promise((resolve, reject) => {
    const tempInsideDay = [];
    const tempInsideWeek = [];
    const tempInsideFortnight = [];
    const tempInsideMonth = [];
    const humidInsideDay = [];
    const humidInsideWeek = [];
    const humidInsideFortnight = [];
    const humidInsideMonth = [];
    const dateInsideDay = [];
    const dateInsideWeek = [];
    const dateInsideFortnight = [];
    const dateInsideMonth = [];
    let sql = `SELECT * FROM inside `;//WHERE data > x: x = 1000 * 60 * 60 * 24 * 30
    
    const todayDay = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    // console.log(`${todayDay}.${todayMonth+1}.${todayYear}`); // Obecna data
    const miliNow = new Date().getTime(); // Obecne milisendu od '70
    // const miliDay = new Date(miliNow - ).getTime();
    // console.log(miliNow);
    const milisFromMidnight = new Date(`${todayMonth+1} ${todayDay}, ${todayYear} 00:00:00 GMT+01:00`).getTime(); // milisekundy od północy
    // console.log(milisFromMidnight);

    db.all(sql, (err, rows) => {
      if (err) return console.err(err.message);
      rows.forEach((row) => {
        const parsedDate = parseFloat(row.data);
        const dayTime = new Date(parsedDate);
        const dayMonth = `${dayTime.getDate()}/${dayTime.getMonth()+1}`; // 7/11
        // console.log(dayTime.getHours(),dayTime.getMinutes());
        if(parsedDate - milisFromMidnight > 0) {
          tempInsideDay.push(row.temp_value);
          humidInsideDay.push(row.humid_value);
          dateInsideDay.push(`${dayTime.getHours()}:${dayTime.getMinutes()}`);

          tempInsideWeek.push(row.temp_value);
          humidInsideWeek.push(row.humid_value);
          dateInsideWeek.push(dayMonth);

          tempInsideFortnight.push(row.temp_value);
          humidInsideFortnight.push(row.humid_value);
          dateInsideFortnight.push(dayMonth);

          tempInsideMonth.push(row.temp_value);
          humidInsideMonth.push(row.humid_value);
          dateInsideMonth.push(dayMonth);
        }
        // console.log(parsedDate);
        // Poodejmowac dzien aka 0:00, tydzien poczatek dnia, dwa tyg poczatek dnia, miesiac poczatek dnia, 
        // if(parsedDate > )
      });
      const insideCharts = new Chart(tempInsideDay, humidInsideDay, dateInsideDay, 'day');
      const res = insideCharts.makeChart('temp')
      const res2 = insideCharts.makeChart('humid')
      // console.log(inside);

      resolve({res,res2});
    });
  });
};

class Chart {
  constructor(temp_values, humid_values, date, label) {
    this.temp_values = temp_values;
    this.humid_values = humid_values;
    this.date = date;
    this.label = label;
  }

  makeChart(input) {
    let chartValues, chartLabel;
    if(input === 'temp'){
      chartValues = this.temp_values;
      switch(this.label){
        case 'day':
          chartLabel = `Wykres temperatury powietrza dzisiaj`;
          break;
        case 'week':
          chartLabel = `Wykres temperatury powietrza (tydzien)`;
          break;
        case 'fortnight':
          chartLabel = `Wykres temperatury powietrza (2 tygodnie)`;
          break;
        case 'month':
          chartLabel = `Wykres temperatury powietrza (miesiac)`;
          break;
      }
    } else {
      chartValues = this.humid_values;
      switch(this.label){
        case 'day':
          chartLabel = `Wykres wilgotnosci powietrza dzisiaj`;
          break;
        case 'week':
          chartLabel = `Wykres wilgotnosci powietrza (tydzien)`;
          break;
        case 'fortnight':
          chartLabel = `Wykres wilgotnosci powietrza (2 tygodnie)`;
          break;
        case 'month':
          chartLabel = `Wykres wilgotnosci powietrza (miesiac)`;
          break;
      }
    }

    


    const chOptions = {
      type: 'line',
      data: {
        labels:this.date,
        datasets:[{
          data: chartValues,
          label: chartLabel,
          fill: true,
          borderColor: '#37c7e0',
          tension: .2,
        }]
      }
    };
    return chOptions;
  }
}

// const tempSoil = [];
// const humidSoil = [];
// const dateSoil = [];
// const inside = {
//     temperature: [],
//     humidity: [],
//     date: []
// }

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

// module.exports.chartData = () => {
//   return new Promise((resolve, reject) => {
//     const tempInside = [];
//     const humidInside = [];
//     const dateInside = [];
//     let sql = `SELECT * FROM inside`;
//     db.all(sql, (err, rows) => {
//       if (err) return console.err(err.message);
//       // console.log(rows);
//       rows.forEach((row) => {
//         tempInside.push(row.temp_value);
//         humidInside.push(row.humid_value);
//         dateInside.push(row.data);
//       });
//       const inside = {
//         temperature: tempInside,
//         humidity: humidInside,
//         date: dateInside,
//       };
//       // console.log(inside);
//       resolve(inside);
//     });
//   })
// };

// const chartOptions = {
//   type: "line",
//   data: {
//     labels: ["Red", "Blue", "", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: 'KEKEKE',
//         data: [12, 19, 31, 5, 2, 3],
//         backgroundColor: [
//           "rgba(77, 255, 12, 0.3)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// };