const router = require('koa-router')()

import {baseApi} from '../configer'
import {captcha, authenticate} from '../controllers/sms'


router.prefix(`/${baseApi}`)

router.post('/captcha', captcha)
//authenticate
router.post('/authenticate', authenticate)

export default router