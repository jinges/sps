import mongoose from 'mongoose'

import md5 from 'md5'
import userSchema from '../models/user'


const user_model  = mongoose.model('User', userSchema(mongoose.Schema));
const ObjectId = mongoose.Types.ObjectId;

export class User {
	constructor() {
        this.user = {};
    }

    async get (params) {
    	return  user_model.find(params);
    }

    async post (params) {
    	return  new user_model(params).save();
    }

    async put () {
    	return  user_model.update(arguments[0], arguments[1])
    }

    async delete (params) {

    }
}

const user = new User();

export async function finduser(params) {
	const result = await user.get(params)
	return result.length? true: false;
}

export async function regist(ctx) {
	try{
		const req = ctx.request.body;
		const captcha = ctx.session.captcha;

		console.log(captcha);

		if(captcha != req.captcha) {
			ctx.body = '验证码不正确';
			return false;
		} else if(!req.password) {
			ctx.body = '密码不能为空';
		}

		req.password = md5(req.password);

		const result = await user.post(req);
	
		ctx.body = 'success';  //result.id;
	}catch(err){
		ctx.body = err;
	}
}

export async function login (ctx){
	const req = ctx.request.body;
	const data = {'name': req.name, 'password': md5(req.password)};
	try{
		const result = await  user.get(data);
	
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
}

export async function logout (ctx) {
	//清除session
	session.uid = null;
	ctx.body = "已退出登录";
}

export async function userinf (ctx) {
	console.log(session.uid);
	const  data  = {'_id': ObjectId(session.uid)}
	try{
		const result =  await user.get(data);
	
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
}

export async function password (ctx) {
	const req = ctx.request.body;
	if(req.password != req.rePassword) {
		ctx.body="密码不一致";
		return false;
	}
	req.password = md5(req.password);

	try{
		const result =  await user.post({'name': req.name}, {$set: {
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
}