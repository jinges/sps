
import user from './user'
import sms from './sms'


// export default (app)=>{
// 	const Router = [user, sm]
	
// 	Router.forEach((route)=>{
// 		app
// 			.use(route.routes())
// 			.use(route.allowedMethods({
// 				throw: true
// 			}))
// 	})
// }

export default [user, sms]