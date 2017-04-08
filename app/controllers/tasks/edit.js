import Ember from 'ember';

export default Ember.Controller.extend({
   actions: {
    editTask: function (id) {
      var self =this;

      var title = this.get("model.title");
      var desc = this.get("model.description");
      var date = this.get("model.date");

      //Update task
      console.log("About to update...");
      console.log("STORE:", this.store.createRecord);

      this.store.findRecord("task", id).then(function (task) {
        task.set("title", title);
        task.set("description", desc);
        task.set("date", new Date(date));

        task.save();
        self.transitionTo("tasks");
      });
      console.log("Todo saved successfully!");
    }
  }
});
