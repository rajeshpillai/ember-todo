import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    deleteTask: function (id) {
      var self = this;
      this.store.findRecord("task", id)
        .then(function (task) {
          task.deleteRecord();
          task.save();
          console.log("Change route...");
          self.transitionToRoute("tasks.index");
        })

    }
  }
});
