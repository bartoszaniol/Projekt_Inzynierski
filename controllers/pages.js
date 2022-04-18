const {PythonShell} = require('python-shell')
const Wykresy = require("../models/dane");
const loginHelper = require('../utils/loginHelper');
const bcrypt = require('bcryptjs');
const spawn = require("child_process").spawn;

exports.getWykresy = (req, res, next) => {
  Wykresy.getCharts().then((data) => {
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
  PythonShell.run('/home/pi/Desktop/Inz/Strona/Projekt_Inzynierski/utils/zarowa.py', {args: [req.body.colorpicker]}, () => {});
  // spawn('python',["/home/pi/Desktop/Inz/Strona/Projekt_Inzynierski/utils/zarowa.py", req.body.colorpicker]);
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
    isLoggedIn: req.session.isLogged,
    errorMessage: req.flash("error")
  });
};

exports.postLogin = (req, res, next) => {
  // auth
  const userName = req.body.name;
  const userPassword = req.body.password;
  loginHelper.findUser(userName)
  .then((user) => {
    if(!user){
      req.flash('error','Wprowadz poprawne dane');
      return res.redirect('/login');
    }
    bcrypt.compare(userPassword, user.password)
    .then((doMatch) => {
      if(doMatch) {
        req.session.isLogged = true;
        return res.redirect('/');
      }
      req.flash('error','Wprowadz poprawne dane');
      res.redirect('/login')
    })
    .catch((err) => {
      console.log(err);
      req.flash('error','Wprowadz poprawne dane');
      res.redirect('/login');
    })
  })
  .catch((err) => {
    console.log(err)
  })
  
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
