import passport from 'koa-passport'
import LocalStrategy from 'passport-local'

import {finduser} from '../controllers/user'

const LocalStrategy = LocalStrategy.Strategy;
passport.use(new LocalStrategy(
	function (username, passport, done){
		finduser({name: username, passport: passport}, function(err, user){
			if(err) {
				return done(err)
			}
			return done(null, user);
		})
	}
))