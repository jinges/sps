import User from './user'

export default {
	captcha: async ctx => {
		const req = ctx.request.body
		const purpose = req.purpose
		console.log(ctx.request.ips);
		const user = await User.search({'username': req.phone})

		if(purpose == 'regist' && user.length) {
			ctx.body = '该手机号码已注册。';
			return false;
		} else if(purpose == 'findpassword' && !user.length) {
			ctx.body = '用户不存在。';
			return false;
		}
		
		ctx.body = '验证码已发送。'
	}
}