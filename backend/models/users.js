const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema

const userSchema = new Schema({

    password:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
   
},{timestamps:true})

userSchema.statics.login = async function (email, password) {

    if(!email || !password){
        console.log(email,password) // undefined
        throw Error("Boş alan bırakılmış !")
    }


    const user = await this.findOne({ email });
    console.log(user)

    if(!user){
        throw Error("Geçersiz E-posta !")
        
    
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Geçersiz Şifre !")
    }
    return user;


}

userSchema.statics.signup = async function(email,password,username) {

    if(!email || !password){
        console.log(email,password) // undefined
        throw Error("Boş alan bırakılmış !")
    }


    const mewcud = await this.findOne({email})

    if(mewcud){
        throw Error("Bu E-posta zaten üye !")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({username,email,password: hash })

    return user;
}


module.exports = mongoose.model("NewUser",userSchema)