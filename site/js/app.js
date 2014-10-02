var app = app || {}

$(function(){
    app.appRouter = new AppRouter()
    Backbone.history.start()
})
