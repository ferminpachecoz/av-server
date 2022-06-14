var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let session = require('express-session')

var indexRouter = require('./routes/index');
let userRouter = require('./routes/userRouter');

var app = express();
const PORT = process.env.PORT || 3001;

//************ Listen port ************
app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3001/');
});
// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: ['https://virtual-custom.herokuapp.com/'],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(session({
    secret: 'aguante el piti vieja!',
    resave: false,
    saveUninitialized: false
}))

app.use('/', indexRouter);
app.use('/users', userRouter);

module.exports = app;
