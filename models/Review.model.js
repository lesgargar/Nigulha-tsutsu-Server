const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    _owner:{ 
        type: Schema.Types.ObjectId, ref: "User"
    },
    _store:{
        type: Schema.Types.ObjectId, ref:"Store"
    }
});
module.exports = model ("Review", reviewSchema)