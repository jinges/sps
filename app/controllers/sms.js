import mongoose from 'mongoose'

import smsSchema from '../models/sms'
import {finduser} from './user'


const sms_model  = mongoose.model('SMS', smsSchema(mongoose.Schema));
const ObjectId = mongoose.Types.ObjectId;

export default class SMS{
	constructor(){

	}

	async get(params){
		return sms_model.find(params);
	}

	async post(params){
		return new sms_model(params).save();
	}
}

const sms = new SMS();

export async function findSMS(params){
	const result = await sms.get(params);
	
	return result.length? true: false;
} 

export async function captcha(ctx) {
	const req = ctx.request.body
	const purpose = req.purpose //1：注册， 2：修改密码， 3：找回密码， 4：通知 
	const  phone = req.name
	try{
		const user = await finduser({'name': req.name})

		if(purpose == 1 && user) {
			ctx.body = '该手机号码已注册。';
			return false;
		} else if((purpose == 2 | purpose == 3) && user) {
			ctx.body = '用户不存在。';
			return false;
		}
		const captcha = (Math.random()*(999999-100000)+100000).toFixed(0);

		console.log(captcha);

		ctx.session[req.name] = captcha;

		ctx.cookies.set('phone', req.name);

		const result = 
			await sms.post({
				phone: req.name,
				code: captcha,
				purpose: purpose
			});
		
		// console.log(ctx.session)
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