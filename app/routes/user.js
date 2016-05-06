import Router from 'koa-router'

import {baseApi} from '../configer'
import User from '../controllers/user'

const router = new Router()

router.prefix(`/${baseApi}/user`)

// router.get('/captcha/:phone', captcha)

router.post('/regist', User.regist)
router.post('/login', User.login)


export default router