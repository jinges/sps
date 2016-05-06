import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
	username: { type: Number, required: true},
	password: {type: String, required: true, minlength: 6},
	sex: {type: Number, default: 1},
	registed: {type: Date, default: Date.now},
	point: {type: Number, default: 0}
})

export default mongoose.model('User', userSchema)
