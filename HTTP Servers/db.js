const mongoose = require("mongoose")



mongoose.connect("mongodb+srv://DevZero:Kamal0342@learn.lzqh8uq.mongodb.net/practise")

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    Username: String,
    Email:{type:String, unique:true, required: true, tirm:true, lowercase:true},
    Password: String
});

const UserModel = mongoose.model("users", User);

module.exports = {
    UserModel: UserModel
}