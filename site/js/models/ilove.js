var app = app || {}

app.ILove = Backbone.Model.extend({

  like: function(){
    likes = this.get('likes')
    likes++;
    this.save({
      likes: likes
    })
  },

  dislike: function(){
    dislikes = this.get('dislikes')
    dislikes++;
    this.save({
      dislikes: dislikes
    })
  }

})
