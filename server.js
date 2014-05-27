var app = require(__dirname + '/app');
console.log(JSON.stringify(process.env));
app.listen(process.argv[2] || 3000);
