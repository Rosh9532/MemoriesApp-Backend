const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    googleId:{
        type:String,
        
    },
    displayName:{
        type:String,
        required:true
    },
    hash_password:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String,        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };

module.exports=mongoose.model('User',UserSchema)