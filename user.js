import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number },
});

export default mongoose.model("User", userSchema);
