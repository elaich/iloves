var app = app || {}

var AppView = Backbone.View.extend({
  el: '#main',

  show: function(){
    console.log('calling show function')
    if (!this.iloveView)
      this.iloveView = new app.ILoveView({ collection: app.ILoves })
    this.iloveView.render()
    this.$('.write_ilove_button').show()
  },

  add: function(){
    if (!this.addILoveView)
      this.addILoveView = new app.AddILoveView()
    this.addILoveView.render()
    this.$('.write_ilove_button').hide()
  }

})
