import Ember from 'ember';

export default Ember.Controller.extend({
   actions: {
    addTask: function () {
      var title = this.get("title");
      var desc = this.get("description");
      var date = this.get("date");

      // Create a  new task with all fields

    }
  }
});
