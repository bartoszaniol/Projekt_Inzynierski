const Wykresy = require("../models/wykresy");

exports.getWykresy = async (req, res, next) => {
  Wykresy.chartData().then((data) => {
    console.log(data);
    res.render("wykresy", {
      pageTitle: "Wykresy",
      path: "wykresy",
      data: data
    });
    
  });
  // console.log(data);
};

exports.getDane = (req, res, next) => {
  res.render("dane", {
    pageTitle: "Dane",
    path: "dane",
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
