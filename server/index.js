/* eslint-env node */

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const mongodb = require("mongodb");

module.exports = function(app) {
  app.use(bodyParser.urlencoded({extended: true}));


  var port = 8888;

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
      extended:true
  }));

  var db;

  var url = "mongodb://localhost:27017/ember_todo";

  MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err);
    db = database;

    console.log("Connected to mongodb...");

    app.get("/api/tasks", function (req, res) {
        var cursor = db.collection("tasks")
            .find()
            .toArray(function(err, results) {
                if (err) console.log(err);
                console.log("Todos:", results);
                res.json({tasks: results});
            });
    });

    app.post('/api/tasks', (req, res) => {
        console.log("About to save the todo: ", req.body.task);

        db.collection("tasks").save(req.body.task, (err, result) => {
            if (err) return console.log(err);
            console.log("Saved to the database!");
            res.send("OK");
        });

    });

    app.get("/api/tasks/:id", function (req, res) {
        console.log("editing todo with id: ", req.params.id);

        var id = new mongodb.ObjectID(req.params.id);

         db.collection("tasks").find({_id: id}).toArray().then(function (data){
            console.log("todo: ", data[0]);
            var todo = data[0];
             res.json({task: todo});
        });

    });

    app.put("/api/tasks/:id", function (req, res) {
        var id = new mongodb.ObjectID(req.body.id);
        console.log("update: ", req.body.todo);
        db.collection("tasks")
            .update({_id:id},{name:req.body.name, todo:req.body.todo},
                function(err, result){
                 });

        res.redirect("/");
    });

    app.get("/delete/:id", function (req, res) {
        console.log("deleting todo with id: ", req.params.id);
        var id = new mongodb.ObjectID(req.params.id);
        db.collection('tasks').remove({_id: id}, function(err, collection) {
            console.log(err);
        });
        res.redirect("/");
    });
  });
};
