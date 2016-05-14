import mongoose from 'mongoose'
import session from 'koa-session'

import md5 from 'md5'
import userSchema from '../models/user'


const User  = mongoose.model('User', userSchema(mongoose.Schema));
const ObjectId = mongoose.Types.ObjectId;

const userObj = {
	regist: async ctx => {
		try{
			const req = ctx.request.body;
			const captcha = session.captcha;
			console.log(captcha);
			console.log(req.captcha);
			if(captcha != req.captcha) {
				ctx.body = '验证码不正确';
				return false;
			} else if(!req.password) {
				ctx.body = '密码不能为空';
			}
			// const data = {'name': req.name};
			// const result = await userObj.search(data);
			// if(result.length) {
			// 	ctx.body = '用户已存在';
			// 	return false;
			// }
			req.password = md5(req.password);

			const result = await new User(req).save();
			ctx.body = result[0].id;
		}catch(err){
			ctx.body = err;
		}
	},
	login: async ctx => {
		const req = ctx.request.body;
		const data = {'name': req.name, 'password': md5(req.password)};
		try{
			const result = await userObj.search(data);
		
			if(!result.length) {
				ctx.body = '用户名或密码错误！'
				return false;
			}

			session.uid = result[0].id;
			ctx.body = {
				uid: session.uid,
				msg: '登录成功'
			}
 		} catch(err) {
			ctx.body = '服务器异常';
		}
	},
	logout: async ctx=>{
		//清除session
		session.uid = null;
		ctx.body = "已退出登录";
	},
	userinf: async ctx => {
		console.log(session.uid);
		const  data  = {'_id': ObjectId(session.uid)}
		try{
			const result = await userObj.search(data);
		
			if(!result.length) {
				ctx.body = '用户已失效，请重新登录'
				return false;
			}
			const data = result[0];
			ctx.body = {
				name: data.name,
				gender: data.gender
			}
		} catch(err) {
			ctx.body = '服务器异常';
		}
	},
	authenticate: async ctx => {
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
	},
	password: async ctx =>{
		const req = ctx.request.body;

		if(req.password != req.rePassword) {
			ctx.body="密码不一致";
			return false;
		}
		req.password = md5(req.password);

		try{
			const result = await User.update({'name': req.name}, {$set: {
				password: req.password
			}});

			if(result.ok) {
				ctx.body = '修改成功'	
			} else {
				ctx.body = '修改失败'
			}
		} catch(err) {
			ctx.body = '服务器异常';
		}
		
	},
	search: async (data) => {
		const result = User.find(data);
		return result;
	}
}

export default userObj