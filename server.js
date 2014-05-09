var app = require(__dirname + '/app');
app.listen(process.env.VCAP_APP_PORT || 3000);
