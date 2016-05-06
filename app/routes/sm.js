import Router from 'koa-router'

import {baseApi} from '../configer'
import sm from '../controllers/sm'

const router = new Router()

router.prefix(`/${baseApi}`)

router.post('/captcha', sm.captcha)

export default router