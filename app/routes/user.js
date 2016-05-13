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
router.get('/userinfo', User.userinf)
//authenticate
router.post('/authenticate', User.authenticate)
//change_password
router.post('/password', User.password)


export default router