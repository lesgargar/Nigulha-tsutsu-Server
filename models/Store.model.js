const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    location: String,
    instagram:{
        type: String
    },
    facebook:{
        type: String
    },
    whatsApp:{
        type: String
    },
    _owner:{ 
        type: Schema.Types.ObjectId, ref: "User"
    },
    image: {
        type:String,
        default: "https://www.clipartmax.com/png/middle/291-2916483_shop-icon-store-icon-white-png.png"
      }
});
module.exports = model ("Store", storeSchema)