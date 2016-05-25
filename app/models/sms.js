export default (Schema)=>{
	const smsSchema = new Schema({
		phone: { type: String, required: true},
		code: { type: Number},
		content: {type: String},
		purpose: {type: String, required: true}, //1：注册， 2：修改密码， 3：找回密码， 4：通知 
		date: {type: Date, default: Date.now}
	})

	return smsSchema
}