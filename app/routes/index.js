
import user from './user'
import sm from './sm'

const Router = [user, sm]

export default (app)=>{
	Router.forEach((route)=>{
		app
			.use(route.routes())
			.use(route.allowedMethods({
				throw: true
			}))
	})
}