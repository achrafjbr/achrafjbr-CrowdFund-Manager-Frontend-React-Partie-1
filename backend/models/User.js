const mongoose = require ("mongoose")
const bcrypt = require("bcryptjs")
const { required } = require("joi")

const userSchema = new mongoose.Schema(
    {
        name :{ type :String,required : [true , "Le nom est obligatoire"],trim : true, minlength : [2 ,"Le nom doit contenir au moins 2 caractères"],
        },
        email : {
                type : String,
                required:[true ,"L'email est obligatoire"],
                unique :true,
                lowercase :true,
                trim : true,
                match: [/^\S+@\S+\.\S+$/, "Format email invalide"],
        },
        password :{
            type :String,
            required : [true , "Le mot de passe est obligatoire"],
            minlength : [6 , "Le mot de passe doit contenir au moins 6 caractères"],
            select : false,
        },
        role : {
            type :String,
            enum :{
                values :["owner"," ","admin"],
                message : "Rôle invalide. Valeurs acceptées : owner, investor, admin",
            }
        },
        balance :{
            type : Number ,
            default : 0,
            min :[0,"Le solde ne peut pas être négatif"],
        },
},
{timestamps : true}
)



userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password)
}

userSchema.methods.toJSON = function (){
    const obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = mongoose.model("User", userSchema)