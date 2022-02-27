const data = require('../models/wykresy');
const charts = require('chart.js');

let myChart = document.getElementById('myChart').getContext('2d');

const chartData = data.getCharts()

let chart = charts.Chart(myChart, chartData);