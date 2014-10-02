var app = app || {}

var ILoves = Backbone.Collection.extend({
  model: app.ILove,
  url: '/api/iloves',
})

app.ILoves = new ILoves()
