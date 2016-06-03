import passport from 'koa-passport'
const router = require('koa-router')()

import user from './user'
import sms from './sms'


const Router = [sms, user]


export default (app)=>{

	// app.use(router.routes(), router.allowedMethods());

	Router.forEach((route)=>{
		app
			.use(route.routes())
			.use(route.allowedMethods({
				throw: true
			}))
	})
}