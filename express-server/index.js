var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var config = require('./config')
var middleware = require('./middlewares/jwt.middleware')
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use('/equipments', middleware.jwtVerify, require('./routes/equipment.route'))
app.use('/users', require('./routes/user.router'))

const mongoose = require('mongoose');
mongoose.connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true });

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});




