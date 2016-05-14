
import user from './user'
import sm from './sm'


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

export default [user, sm];