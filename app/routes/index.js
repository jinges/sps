const router = require('koa-router')()

import user from './user'
import sms from './sms'



const Router = [user, sms]

export default (app)=>{
	Router.forEach((route)=>{
		app
			.use(route.routes())
			.use(route.allowedMethods({
				throw: true
			}))
	})
}