var app = app || {}

var AppRouter = Backbone.Router.extend({

  initialize: function(){
    console.log('initializing router')
    this.appView = new AppView()
  },

  routes: {
    '': 'show',
    'add': 'add',
    '_=_': 'redirect'
  },

  redirect: function() {
    this.navigate('', true)
  },

  show: function() {
    console.log('showing')
    this.appView.show()
  },

  add: function() {
    console.log('adding')
    this.appView.add()
  }
})


