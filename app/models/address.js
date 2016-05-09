import mongoose from 'mongoose'

const Schema = mongoose.Schema

const addrSchema = new Schema({
	cnee: {type: String, required: true},
	phone: {type: Number, required: true},
	region: {type: Number, required: true},
	address: {type: String, required: true},
	default: {type: Boolean, default: false}
})

export default mongoose.model('Address', addrSchema)
