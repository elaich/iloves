var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy
    ids = require('./config/ids')

/* MongoDB */
mongoose.connect('mongodb://localhost/iloves_database')

/* ILove Model */
var ILoveModel = mongoose.model('ILove', { text: String , author_id: String})

/* User Model */
var UserModel = mongoose.model('User', { id: String, name: String, photo: String })

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(obj, done){
  done(null, obj)
})


passport.use(new FacebookStrategy({
  clientID: ids.facebook.clientID, 
  clientSecret: ids.facebook.clientSecret,
  callbackURL: ids.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'photos']
}, function(accessToken, refreshToken, profile, done){
  process.nextTick( function(){
    UserModel.findOne( {'id': profile.id}, function(err, user){
      if (err) return done(err)
        if (user)
          return done(null, user)
      else
        var newUser = new UserModel({
          id: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value
        })
        newUser.save(function(err){
          if (err) throw err
            return done(null, newUser)
        })
    })
  })
}))

var app = express()

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(session({ secret: 'MySecretWillAlwaysRemainMySecret'}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/$', function(req, res, next){
  if (!req.isAuthenticated())
    return res.redirect('/login')
  next()
})

app.use('/static', express.static(path.join(__dirname, 'site')))

app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res){
  res.render('index.html', { 
    user_name: req.user.name,
    photo_url: req.user.photo
  })
})

app.get('/login', function(req, res){
  res.send('<a href="/auth/facebook">Connect</a>')
})

app.get('/auth/facebook', 
        passport.authenticate('facebook'), 
        function(req, res){
        })

app.get('/auth/facebook/callback', 
       passport.authenticate('facebook', { failureRedirect: '/login' }),
       function(req, res){
         res.redirect('/')
       })

app.get('/api', function(req, res){
  res.send('Api running')
})

app.get('/api/auth/user', function(req, res){
  res.send(req.user)
})

app.get('/api/users/:id', function(req, res){
  UserModel.findOne({'id': req.params.id}, function(err, user){
    if (err)
      throw err
    return res.send(user)
  })
})

app.get('/api/iloves', function(req, res){
  return ILoveModel.find( function( err, iloves ) {
    if( !err ) {
      return res.send( iloves );
    } else {
      return console.log( err );
    }
  })
})

app.post('/api/iloves', function(req, res){
  var ilove = new ILoveModel({text: req.body.text, author_id: req.body.author_id})
  ilove.save(function(err, ilove){
    if(err)
      console.log(err)
    else
      res.send(ilove)
  })
})

var port = 1234;
app.listen(port, function(){
  console.log('Express server listening on port %d in %s mode',
             port, app.settings.env)
})
