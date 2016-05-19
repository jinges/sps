import Router from 'koa-router'

import {baseApi} from '../configer'
import {regist, login, userinf, password} from '../controllers/user'

const router = new Router()

router.prefix(`/${baseApi}/user`)

//regist
router.post('/regist', regist)
//login
router.post('/login', login)
//userinf
router.get('/userinfo', userinf)
//change_password
router.post('/password', password)


export default router