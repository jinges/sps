import Router from 'koa-router'

import {baseApi} from '../configer'
import User from '../controllers/user'

console.log(User);

const router = new Router()

router.prefix(`/${baseApi}/user`)

//regist
router.post('/regist', User.regist)
//login
router.post('/login', User.login)
//userinf
router.get('/', async (ctx)=>{
	ctx.body = 'hello'
})
//find_password
router.post('/find_password', User.findPassord)


export default router