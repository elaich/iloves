var app = app || {}

_.templateSettings = {
  interpolate: /\{\{([\s\S]+?)\}\}/g
}

app.ILoveView = Backbone.View.extend({

  el: '#main-article',

  template: _.template($('#ilove-template').html()),

  initialize: function() {
    console.log('ilove view initialized')
    this.currentIndex = 0
    this.listenTo(this.collection, 'reset', this.render)
    this.collection.fetch({reset: true})
  },

  events: {
    'click .previous_button': 'previous',
    'click .next_button': 'next',
  },

  render: function() {
    console.log('called render')
    this.model = this.getCurrent()
    if (this.model){
      this.$el.html(this.template( this.model.toJSON() ))
      this.renderAuthor(this.model)
    }
    else
      this.$el.html('No iloves, <a href="#add">be the first</a>')
    this.$('.ilove_text_block').hover(function(){
      $(this).find('.like_button').removeClass('hidden')
    }, function(){
      $(this).find('.like_button').addClass('hidden')
    })
    return this
  },

  renderAuthor: function(model){
    var view = this;
    jQuery.get('/api/users/' + model.get('author_id'), function(data){
      console.log('writing the author name: ' + data.name)
      view.$el.find('.ilove_author').html('By ' + data.name)
    })
  },

  previous: function() {
    this.currentIndex = (this.currentIndex === 0)? this.collection.length - 1: this.currentIndex - 1
    console.log('getting previous ' + this.currentIndex)
    this.render()
  },

  next: function() {
    this.currentIndex = (this.currentIndex === this.collection.length - 1)? 0: this.currentIndex + 1
    console.log('getting next ' + this.currentIndex)
    this.render()
  },

  getCurrent: function() {
    return this.collection.at(this.currentIndex)
  }



})
