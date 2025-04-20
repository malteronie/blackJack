
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   password : {
        type:String,
        require: true,
        minlength:6,
   },
   createdAt: {
       type:Date,
       default: Date.now
    },
    nom: {
        type : String,
        require:true,
    },
    solde: {
        type:Number,
        default:5000
    }
});

module.exports = mongoose.model("User", UserSchema);