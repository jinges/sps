export default (Schema)=>{
    const userSchema = new Schema({
        name: { type: Number, required: true},
        password: {type: String, required: true, minlength: 6},
        gender: {type: Number, default: 1},
        point: {type: Number, default: 0},
        balance: {type: Number, default: 0}
    })

    return userSchema;
}