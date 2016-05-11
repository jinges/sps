import Router from 'koa-router'

import {baseApi} from '../configer'
import User from '../controllers/user'


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
//authenticate
router.post('/authenticate', User.authenticate)
//find_password
router.post('/changepassword', User.changepassword)


export default router