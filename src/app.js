const express = require('express');
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');

const app = express();

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layout'); // default layout.ejs

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const store = new SequelizeStore({ db: sequelize });

app.use(session({
  secret: process.env.SESSION_SECRET,
  store,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

store.sync();

app.use((req, res, next) => {
  res.locals.user = req.session ? req.session.user : null;
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
}); 

app.use(require('./routes/userRoutes'));
app.use(require('./routes/authRoutes'));
app.use(require('./routes/dashboardRoutes'));
app.use(require('./routes/projectRoutes'));
app.use(require('./routes/taskRoutes'));

app.use(require('./middlewares/errorMiddleware'));

module.exports = app;