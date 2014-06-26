var app = require('./app');
var dataSource = app.dataSources.mysql;
var Todo = app.models.todo;
var data = [ { 
    title: "learn loopback",
    competed: false
  }, { 
    title: "lear ionic",
    competed: false
  }];

var count = Todo.length;
dataSource.automigrate('todo', function (err) {
  data.forEach(function(d) {
    Todo.create(d, function(err, result) {
      if(!err) {
        console.log('Record created:', result);
        count--;
        if(count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      }
    });
  });
});