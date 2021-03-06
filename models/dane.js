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
          returnValue.soilTempDate = `${returnDate.toLocaleString()}`;
        });
        
        let sql = `SELECT * FROM soil WHERE podlanie = ?`;
        db.all(sql, ['true'], (err, rows) => {
          rows.forEach((row) => {
            returnDate = new Date(parseFloat(row.data));
            returnValue.soilDate = `${returnDate.toLocaleString()}`;
          });
          resolve(returnValue);
        });
      });
    });
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
    const today = new Date();
    const todayDay = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    const miliNow = new Date().getTime(); // Obecne milisendu od '70
    const milisFromMidnight = new Date(`${todayMonth+1} ${todayDay}, ${todayYear} 00:00:00 GMT+02:00`).getTime(); // milisekundy od p????nocy
    const milisFromWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7).getTime();
    const milisFromFortnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()-14).getTime();
    const milisFromMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate()-30).getTime();

    db.all(sql, (err, rows) => {
      if (err) return console.err(err.message);
      rows.forEach((row) => {
        const parsedDate = parseFloat(row.data);
        const dayTime = new Date(parsedDate);
        const dayMonth = `${dayTime.getDate()}/${dayTime.getMonth()+1}`; // 7/11
        if(parsedDate - milisFromMidnight > 0) { // Sprawdzenie czy to obecny dzien
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
        } else if (parsedDate - milisFromWeek > 0) {
          tempInsideWeek.push(row.temp_value);
          humidInsideWeek.push(row.humid_value);
          dateInsideWeek.push(dayMonth);

          tempInsideFortnight.push(row.temp_value);
          humidInsideFortnight.push(row.humid_value);
          dateInsideFortnight.push(dayMonth);

          tempInsideMonth.push(row.temp_value);
          humidInsideMonth.push(row.humid_value);
          dateInsideMonth.push(dayMonth);
        } else if (parsedDate - milisFromFortnight > 0) {
          tempInsideFortnight.push(row.temp_value);
          humidInsideFortnight.push(row.humid_value);
          dateInsideFortnight.push(dayMonth);

          tempInsideMonth.push(row.temp_value);
          humidInsideMonth.push(row.humid_value);
          dateInsideMonth.push(dayMonth);
        } else if (parsedDate - milisFromMonth > 0) {

          tempInsideMonth.push(row.temp_value);
          humidInsideMonth.push(row.humid_value);
          dateInsideMonth.push(dayMonth);
        }
        // console.log(parsedDate);
        // Poodejmowac dzien aka 0:00, tydzien poczatek dnia, dwa tyg poczatek dnia, miesiac poczatek dnia, 
        // if(parsedDate > )
      });
      const dayChart = new Chart(tempInsideDay, humidInsideDay, dateInsideDay, 'day');
      const tempDay = dayChart.makeChart('temp')
      const humidDay = dayChart.makeChart('humid')
      // console.log(inside);
      const weekChart = new Chart(tempInsideWeek, humidInsideWeek, dateInsideWeek, 'week');
      const tempWeek = weekChart.makeChart('temp')
      const humidWeek = weekChart.makeChart('humid')

      const fortnightChart = new Chart(tempInsideFortnight, humidInsideFortnight, dateInsideFortnight, 'fortnight');
      const tempFortnight = fortnightChart.makeChart('temp')
      const humidFortnight = fortnightChart.makeChart('humid')

      const monthChart = new Chart(tempInsideMonth, humidInsideMonth, dateInsideMonth, 'month');
      const tempMonth = monthChart.makeChart('temp')
      const humidMonth = monthChart.makeChart('humid')
      resolve([{tempDay, humidDay}, {tempWeek, humidWeek}, {tempFortnight, humidFortnight}, {tempMonth,humidMonth}]);
    });
  });
};

class Chart {
  constructor(temp_values, humid_values, date, label) {
    this.temp_values = temp_values;
    this.humid_values = humid_values;
    this.date = date;
    this.label = label;
    this.minTemp = Math.min(...temp_values)
    this.maxTemp = Math.max(...temp_values)
    this.minHumid = Math.min(...humid_values)
    this.maxHumid = Math.max(...humid_values)
    this.sumTemp = temp_values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    this.sumHumid = humid_values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    this.avgTemp = this.sumTemp / this.temp_values.length
    this.avgHumid = this.sumHumid / this.humid_values.length
  }

  makeChart(input) {
    let chartValues, chartLabel;
    const getter = {}
    if(input === 'temp'){
      chartValues = this.temp_values;
      getter.minTemp = this.minTemp;
      getter.avgTemp = this.avgTemp;
      getter.maxTemp = this.maxTemp;
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
      getter.minHumid = this.minHumid;
      getter.avgHumid = this.avgHumid;
      getter.maxHumid = this.maxHumid;
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
    };

    const segregatedDates = {};
    const segregatedDatesTimes = {};
    // labels and data
    if(this.label !== 'day'){
      for (const [index, date] of this.date.entries()) {
        if(segregatedDates.hasOwnProperty(date)){
          segregatedDates[date] = segregatedDates[date] + parseFloat(chartValues[index]);
          segregatedDatesTimes[date] = segregatedDatesTimes[date] + 1;
        } else {
          segregatedDates[date] = parseFloat(chartValues[index]);
          segregatedDatesTimes[date] = 1;
        };
      };
      // console.log(segregatedDates);
      // console.log(segregatedDatesTimes);
    };
    
    //
    let finalLabels = [];
    let finalValues = [];
    if(this.label==='day') {
    finalValues = chartValues;
    finalLabels = this.date;
    }else {
      for (const key in segregatedDates) {
        finalLabels.push(key);
        const finalAvgTemp = segregatedDates[key] / segregatedDatesTimes[key]
        // console.log(finalAvgTemp)
        finalValues.push(finalAvgTemp.toFixed(2))
      }
    }

    // console.log(finalValues)
    const chOptions = {
      type: 'line',
      data: {
        labels:finalLabels,
        datasets:[{
          data: finalValues,
          label: chartLabel,
          fill: true,
          borderColor: '#37c7e0',
          tension: .2,
        }]
      }
    };
    return [chOptions, getter];
  }
}