const Wykresy = require("../models/dane");

exports.getWykresy = (req, res, next) => {
  // Wykresy.chartData().then((data) => {
  Wykresy.getCharts().then((data) => {
    // console.log(data);
    res.render("wykresy", {
      pageTitle: "Wykresy",
      path: "wykresy",
      chartData: data,
    });
  });
};

exports.getDane = (req, res, next) => {
  Wykresy.getLastData().then((val) => {
    res.render("dane", {
      pageTitle: "Dane",
      path: "dane",
      values: val
    });
  });
};

exports.getStream = (req, res, next) => {
  res.render("stream", {
    pageTitle: "Stream",
    path: "stream",
  });
};

exports.getSwiatlo = (req, res, next) => {
  res.render("swiatlo", {
    pageTitle: "Swiatlo",
    path: "swiatlo",
  });
};

exports.getSzklarnia = (req, res, next) => {
  res.render("szklarnia", {
    pageTitle: "Strona glowna",
    path: "szklarnia",
  });
};
