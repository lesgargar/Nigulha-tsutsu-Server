const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    _owner:{ 
        type: Schema.Types.ObjectId, ref: "Store"
    },
    image: {
        type:String,
        default: "https://cdn-icons-png.flaticon.com/512/1170/1170577.png"
    }
});
module.exports = model ("Product", productSchema)