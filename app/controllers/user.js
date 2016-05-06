import md5 from 'md5'

import User from '../models/user'


const userObj = {
	regist: async ctx => {
		try{
			const req = ctx.request.body;
			req.password = md5(req.password);
			ctx.body = await new User(req).save()
		}catch(err){
			ctx.body = err;
		}
	},
	login: async ctx => {
		const req = ctx.request.body;
		const data = {'username': req.username, 'password': md5(req.password)};
		const result = await userObj.search(data);
		console.log(result);
		if(result.length) {
			ctx.body = '登录成功！'
		} else {
			ctx.body = '用户名或密码错误！'
		}
	},
	search: async (data) => {
		const result = User.find(data);
		return result;
	}
}

export default userObj