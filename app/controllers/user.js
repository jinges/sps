import mongoose from 'mongoose'

import md5 from 'md5'
import userSchema from '../models/user'


const User  = mongoose.model('User', userSchema(mongoose.Schema));
const ObjectId = mongoose.Types.ObjectId;

const userObj = {
	regist: async ctx => {
		try{
			const req = ctx.request.body;
			const captcha = ctx.session.captcha;
			if(captcha != req.captcha) {
				ctx.body = '验证码不正确';
				return false;
			}
			req.password = md5(req.password);

			ctx.body = await new User(req).save()
		}catch(err){
			ctx.body = err;
		}
	},
	login: async ctx => {
		const req = ctx.request.body;
		const data = {'name': req.name, 'password': md5(req.password)};
		const result = await userObj.search(data);

		// console.log(ObjectId(result[0].id).getTimestamp());
		// console.log(await userObj.search({'_id': ObjectId(result[0].id)}));
		
		ctx.session.set('UID', ObjectId(result[0].id));
		if(result.length) {
			ctx.body = '登录成功！'
		} else {
			ctx.body = '用户名或密码错误！'
		}
	},
	logout: async ctx=>{
		//清除session
		ctx.body = "已退出登录";
	},
	userinf: async ctx => {
		const req = ctx.request.body;
		ctx.body = req;
	},
	authenticate: async ctx => {
		try{
			const req = ctx.request.body;
			const captcha = ctx.session.captcha;

			console.log(captcha);

			console.log(req.captcha);
			
			if(captcha != req.captcha) {
				ctx.body = '验证码不正确';
				return false;
			}
			ctx.status = 200;
			ctx.body = '验证通过';
		} catch(err){
			ctx.body = err;
		}
	},
	changepassword: async ctx =>{
		const req = ctx.request.body;
		if(req.password != req.rePassword) {
			ctx.body="密码不一致";
			return false;
		}
		req.password = md5(req.password);

		const result = await userObj.update({}, {$set: {
			password: req.password
		}})
	},
	search: async (data) => {
		const result = User.find(data);
		return result;
	}
}

export default userObj