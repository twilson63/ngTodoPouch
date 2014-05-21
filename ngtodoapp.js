var pkg = require('./package.json');
var seaport = require('seaport');
var ports = seaport.connect('seaport.eirenerx.com', 9090);

var app = require('./app');
app.listen(ports.register([pkg.name, pkg.version].join('@')));
