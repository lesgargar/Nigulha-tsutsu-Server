const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Name is required."],
    },
    gender:{
      type:String,
      enum:["Female", "Male", "Transgender", "Other", "I prefer not to say"]
    },
    role:{
      type:String,
      enum:["Admin", "User"],
      default:"User"
    },
    image:{
      type:String,
      default: "https://cdn-icons-png.flaticon.com/512/5987/5987462.png"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
