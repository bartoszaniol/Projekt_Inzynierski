const Wykresy = require("../models/dane");
const loginHelper = require('../utils/loginHelper');
const bcrypt = require('bcryptjs');

exports.getWykresy = (req, res, next) => {
  // Wykresy.chartData().then((data) => {
  Wykresy.getCharts().then((data) => {
    // console.log(data);
    res.render("wykresy", {
      pageTitle: "Wykresy",
      path: "wykresy",
      chartData: data,
      isLoggedIn: req.session.isLogged
    });
  });
};

exports.getDane = (req, res, next) => {
  Wykresy.getLastData().then((val) => {
    res.render("dane", {
      pageTitle: "Dane",
      path: "dane",
      values: val,
      isLoggedIn: req.session.isLogged
    });
  });
};

exports.getStream = (req, res, next) => {
  res.render("stream", {
    pageTitle: "Stream",
    path: "stream",
    isLoggedIn: req.session.isLogged
  });
};

exports.getSwiatlo = (req, res, next) => {
  res.render("swiatlo", {
    pageTitle: "Swiatlo",
    path: "swiatlo",
    isLoggedIn: req.session.isLogged
  });
};

exports.postSwiatlo = (req, res, next) => {
  console.log(req.colorpicker);
  res.render("stream", {
    pageTitle: "Stream",
    path: "stream",
    isLoggedIn: req.session.isLogged
  });
};

exports.getSzklarnia = (req, res, next) => {
  res.render("szklarnia", {
    pageTitle: "Strona glowna",
    path: "szklarnia",
    isLoggedIn: req.session.isLogged
  });
};

exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Logowanie",
    path: "login",
    isLoggedIn: req.session.isLogged
  });
};

exports.postLogin = (req, res, next) => {
  // auth
  const userName = req.body.name;
  const userPassword = req.body.password;
  loginHelper.findUser(userName)
  .then((user) => {
    if(!user){
      return res.redirect('/login');
    }
    bcrypt.compare(userPassword, user.password)
    .then((doMatch) => {
      if(doMatch) {
        req.session.isLogged = true;
        return res.redirect('/');
      }
      res.redirect('/login')
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/login');
    })
  })
  .catch((err) => {
    console.log(err)
  })
  
};

exports.postLogout = (req, res, next) => {
  // auth
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
