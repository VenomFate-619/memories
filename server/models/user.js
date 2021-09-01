import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String},
  id: { type: String },
  method:{type: String,default:"local"}
});

export default mongoose.model("User", userSchema);