
import User from './user'

export default {
	captcha: async ctx => {
		const req = ctx.request.body
		const purpose = req.purpose
		
		try{
			const user = await User.search({'name': req.phone})

			if(purpose == 'regist' && user.length) {
				ctx.body = '该手机号码已注册。';
				return false;
			} else if(purpose == 'findpassword' && !user.length) {
				ctx.body = '用户不存在。';
				return false;
			}
			const code = (Math.random()*(999999-100000)+100000).toFixed(0);

			ctx.cookies.set('code', code)

			console.log(code)
			
			ctx.body = '验证码已发送。'
		} catch(err) {
			ctx.body = '服务器错误';
		}
	}
}