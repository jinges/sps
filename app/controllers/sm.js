import session from 'koa-session'

import User from './user'

export default {
	captcha: async ctx => {
		const req = ctx.request.body
		const purpose = req.purpose
		console.log(req);
		try{
			const user = await User.search({'name': req.name})

			if(purpose == 'regist' && user.length) {
				ctx.body = '该手机号码已注册。';
				return false;
			} else if(purpose == 'findpassword' && !user.length) {
				ctx.body = '用户不存在。';
				return false;
			}
			const captcha = (Math.random()*(999999-100000)+100000).toFixed(0);

			session.captcha = captcha;

			console.log(ctx.session);
			console.log(captcha);

			
			ctx.body = '验证码已发送。'
		} catch(err) {
			ctx.body = '服务器错误';
		}
	}
}