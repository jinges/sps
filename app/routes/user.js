import passport from 'koa-passport'

import {baseApi} from '../configer'
import {regist, login, userinf, password} from '../controllers/user'
import authMiddleware from '../middleware/authMiddleware'

const router = require('koa-router')()

router.prefix(`/${baseApi}/user`)

//regist
router.post('/regist', regist)

//userinf
router.get('/userinfo', 
	authMiddleware.isAuthenticated,
	userinf)
//change_password
router.post('/password', password)

router.post('/login', 
	passport.authenticate('basic', {session: false}),
	function(ctx){
		console.log(ctx.request.user);
		console.log(ctx.response.user);
		ctx.body = 'success';
	}
)

export default router