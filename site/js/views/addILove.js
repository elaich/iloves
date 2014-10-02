var app = app || {}

app.AddILoveView = Backbone.View.extend({

  el: '#main-article',

  template: _.template($('#ilove-form-template').html()),

  render: function() {
    this.$el.html(this.template())
    return this
  },

  events: {
    'click .add_ilove_button': 'add'
  },

  add: function(){
    var text = this.$('textarea').val().trim()
    if (text){
      $.get('/api/auth/user', function(data){
        if(data){
          console.log('user with id %s wrote this ilove',
                     data.id)
          app.ILoves.create({ text: text, author_id: data.id })
          app.appRouter.navigate('', true)
        }
      })
    }
  }
})
