import Router from 'koa-router'
const router = new Router()

import user from './user'
import sms from './sms'


export default (app)=>{
	const Router = [user(router), sms(router)]
	
	Router.forEach((route)=>{
		app
			.use(route.routes())
			.use(route.allowedMethods({
				throw: true
			}))
	})

	// app.use('/login', router)
}
