import Ember from 'ember';

export default Ember.Controller.extend({
   actions: {
    addTask: function () {
      var title = this.get("title");
      var desc = this.get("description");
      var date = this.get("date");
      console.log("title: ", title);
      if (!title) {
         Ember.run(this, function() {
          this.set('errors', "title is required");
        });
        return;
      }
      // Create a  new task with all fields
      console.log("About to save...");
      console.log("STORE:", this.store.createRecord);
      var newTask = this.store.createRecord("task", {
        title: title,
        description: desc,
        date: new Date(date)
      });

      // Save to database
      newTask.save();

      console.log("Todo saved successfully!");

      // Clear the form
      this.setProperties({
        title: "",
        description: "",
        date: ""
      });
    }
  }
});
