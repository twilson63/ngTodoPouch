var app = require('./app');
console.log('Starting Server on PORT ' + process.env.VCAP_APP_PORT);
app.listen(process.env.VCAP_APP_PORT || 3000);
