const mongoose = require("mongoose")
const col_name  = "users"
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    gridRadios:String,
    gridCheck1:[String],
    experience:String
});
mongoose.model(col_name, userSchema);
module.exports = mongoose.model(col_name)