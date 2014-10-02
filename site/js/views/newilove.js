var app = app || {}

app.NewILoveView = Backbone.View.extend({
  el: '.ilove-container',

  template: _.template($('#add-ilove-template').html()),

  events: {
    'click #submit-ilove': 'addILove'
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  addILove: function(){
    var text = this.$('#new-ilove').val().trim()
    if (text)
      app.ILoves.create({text: text})
  }
})
