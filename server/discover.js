var app = require('./app');
var dataSource = app.dataSources.mysql;

dataSource.discoverSchema('todo', {}, function (err, schema) {
	//console.log(err);
    console.log(JSON.stringify(schema, null, '  '));
});

dataSource.discoverAndBuildModels('todo', {}, function (err, models) {
	//console.log(err);
    models.Todo.find(function (err, act) {
        if (err) {
            console.error(err);
        } else {
            console.log(act);
        }
        dataSource.disconnect();
    });
});