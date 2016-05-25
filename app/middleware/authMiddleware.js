import passport from 'koa-passport'
import LocalStrategy from 'passport-local'

import {finduser} from '../controllers/user'

const LocalStrategy = LocalStrategy.Strategy;
passport.use(new LocalStrategy(
	async function (name, passport, done){
		finduser({name: name, passport: passport}, function(err, user){
			if(err) {
				return done(err)
			}
			return done(null, user);
		})
	}
))