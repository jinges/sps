import Router from 'koa-router'

import {baseApi} from '../configer'
import {captcha, authenticate} from '../controllers/sms'

const router = new Router()

router.prefix(`/${baseApi}`)

router.post('/captcha', captcha)
//authenticate
router.post('/authenticate', authenticate)

export default router