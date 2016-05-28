import passport from 'koa-passport'
import {finduser} from '../controllers/user'


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

const  LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(name, passport, done) {
	finduser({name: name, password: password})
}))

const BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new BasicStrategy(async function (name, password, done){
	var user = await finduser({name: name, password: password});
	return done(null, user)
}))


exports.isAuthenticated = passport.authenticate('basic', { session : false });
