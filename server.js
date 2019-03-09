var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config');


var routes = require('./routes/index');
mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
    console.log('Error: No se pudo conectar a MongoDB. Te olvidaste de ejecutar `mongod`?'.red);
});
var app = express();
app.set('port', process.env.PORT || 5000)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);


app.listen(app.get('port'), function() {
    console.log('Express server escuchando en el puerto ' + app.get('port'))
})