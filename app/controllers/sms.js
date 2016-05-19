// import session from 'koa-session2'

import {finduser} from './user'

export async function captcha(ctx) {
	const req = ctx.request.body
	const purpose = req.purpose
	try{
		const user = finduser({'name': req.name})

		if(purpose == 'regist' && user.length) {
			ctx.body = '该手机号码已注册。';
			return false;
		} else if(purpose == 'findpassword' && !user.length) {
			ctx.body = '用户不存在。';
			return false;
		}
		const captcha = (Math.random()*(999999-100000)+100000).toFixed(0);

		console.log(captcha);

		console.log(ctx.session);
		ctx.session.captcha = captcha;
		console.log(ctx.session);
		
		ctx.body = '验证码已发送。'
	} catch(err) {
		ctx.body = '服务器异常';
	}
}

export async function authenticate (ctx) {
	try{
		const req = ctx.request.body;
		const captcha = session.captcha;
		
		if(captcha != req.captcha) {
			ctx.body = '验证码不正确';
			return false;
		}
		session.captcha = null;
		ctx.status = 200;
		ctx.body = '验证通过';
	} catch(err){
		ctx.body = '服务器异常';
	}
}