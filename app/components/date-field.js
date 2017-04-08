/* global moment */
import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'date',
  formatDate: function() {
    var val = this.get("value");
    console.log("Date: ", val);
    this.set('value', moment(val).format("YYYY-MM-DD"));
  }.on('didInsertElement')
});
