const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema
const userSchema=new Schema({
name:{
    type:String,
    required:true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
},
email:{
    type:String,
    unique:true,
    required:true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
},
password:{
    type:String,
    minlength: [6, 'Password must be at least 6 characters']
},
role:{
    type:String,
    enum:['User','Admin','Super Admin'],
    default:'User'
},
isActive:{
    type:Boolean,
    default:true
},
tokenVersion: { type: Number, default: 0 },
imageUrl:String,
imagePublicId:String,
resetPasswordToken:String,
resetPasswordExpires:Date
},{
    timestamps:true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
module.exports=mongoose.model('User',userSchema)