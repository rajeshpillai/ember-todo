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

var url = "mongodb://localhost:27017/todo-ember";

module.exports = function(app) {
  app.use(bodyParser.urlencoded({extended: true}));


  var port = 8888;

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
      extended:true
  }));

  var db;

  var url = "mongodb://localhost:27017/ember-todo";

  MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err);
    db = database;

    console.log("Connected to mongodb...");

    app.get("/", function (req, res) {
        var cursor = db.collection("todos")
            .find()
            .toArray(function(err, results) {
                if (err) console.log(err);
                console.log("Todos:", results);
                res.render("index.ejs", {todos: results});
            });
    });

    app.post('/todos', (req, res) => {
        console.log("About to save the todo: ", req.body);
        db.collection("todos").save(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log("Saved to the database!");
            res.redirect("/");
        });
    });

    app.get("/edit/:id", function (req, res) {
        console.log("editing todo with id: ", req.params.id);

        var id = new mongodb.ObjectID(req.params.id);

         db.collection("todos").find({_id: id}).toArray().then(function (data){
            console.log("todo: ", data[0]);
            var todo = data[0];
             res.render("edit.ejs", {todo: todo});
        });

    });

    app.post("/update", function (req, res) {
        var id = new mongodb.ObjectID(req.body.id);
        console.log("udpate: ", req.body.todo);
        db.collection("todos")
            .update({_id:id},{name:req.body.name, todo:req.body.todo},
                function(err, result){
                 });

        res.redirect("/");
    });

    app.get("/delete/:id", function (req, res) {
        console.log("deleting todo with id: ", req.params.id);
        var id = new mongodb.ObjectID(req.params.id);
        db.collection('todos').remove({_id: id}, function(err, collection) {
            console.log(err);
        });
        res.redirect("/");
    });
  });
};
