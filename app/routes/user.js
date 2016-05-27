import passport from 'koa-passport'

import {baseApi} from '../configer'
import {regist, login, userinf, password} from '../controllers/user'

const router = require('koa-router')()

router.prefix(`/${baseApi}/user`)

//regist
router.post('/regist', regist)

//userinf
router.get('/userinfo', userinf)
//change_password
router.post('/password', password)

export default router