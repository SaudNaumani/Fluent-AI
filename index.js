const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(bodyParser.json());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use('/public', express.static(__dirname + '/public'));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

require("./models/User");
const User = mongoose.model("users");

app.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});


app.get("/login", (req, res) => {
  res.render("login", { user: req.session.user});
});

app.get("/signup", (req, res) => {
  res.render("signup", { user: req.session.user});
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.get("/languages/:name/topics", (req, res) => {
    res.render("topics", { user: req.session.user});
});

app.post("/login", urlencodedParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email, password: password }).then(user => {
    if (user) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/signup", urlencodedParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const language = req.body.language;
  user = new User({
    email: email,
    password: password,
    name: name,
    language: language
  })
  .save()
  .then(user => {
    req.session.user = user;
    res.redirect("/");
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);
