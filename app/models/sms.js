export default (Schema)=>{
	const smsSchema = new Schema({
		phone: { type: Number, required: true},
		code: { type: Number},
		content: {type: String},
		type: {type: Number, required: true} //1：注册， 2：修改密码， 3：找回密码， 4：通知 
	})

	return smsSchema
}