const mongoose = require("mongoose")
const col_name  = "userLogin"
const userSchema = new mongoose.Schema({
   name:String,
   email:String
});
mongoose.model(col_name, userSchema);
module.exports = mongoose.model(col_name)