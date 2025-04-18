
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Enlève les espaces avant et après l'email
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
    }
});

module.exports = mongoose.model("User", UserSchema);