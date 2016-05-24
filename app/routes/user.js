import passport from 'koa-passport'
import Router from 'koa-router'

import {baseApi} from '../configer'
import {regist, login, userinf, password} from '../controllers/user'

const router = new Router()

router.prefix(`/${baseApi}/user`)

//regist
router.post('/regist', regist)
//login
router.post('/login',  ctx=>{
	passport.authenticate('local', function(err, user, info) {
	    if (err) { 
	    	ctx.body = err;
	    }
	    if (!user) { 
	    	ctx.body = '用户名或密码错误'
	    }
	    ctx.login(user, function(err) {
	        ctx.body = '登录成功'
	    });
	})
})
//userinf
router.get('/userinfo', userinf)
//change_password
router.post('/password', password)


export default router