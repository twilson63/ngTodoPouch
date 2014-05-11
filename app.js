// jaws..
var jaws = require('jaws');
var app = jaws();

// standard routes
require('./forward')(app);
require('./routes')(app);
require('./static')(app);

module.exports = app.httpServer;

// add websockets...if needed..
// var _ = require('underscore');
// var pin = require('linchpin');
// var Primus = require('primus');
//

// require reactive modules here...
//require('./rx/account')();

// var primus = new Primus(app.httpServer, {
//   transformer: 'websockets',
//   parser: 'JSON'
// });
//
// primus.on('connection', function connection(spark) {
//   //console.log('connected...');
//   spark.on('data', function (data) {
//     //console.log(data);
//     // is valid data and has command and body
//     pin.emit(data.command, spark.id, data.body);
//   });
// });
//
// pin.on('out/client', function (id, data) {
//   primus.spark(id).write(data);
// });
