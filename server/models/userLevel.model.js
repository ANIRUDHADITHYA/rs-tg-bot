import { Schema, model } from "mongoose";

const userLevelSchema = new Schema({
    level: { type: String, required: true, unique: true },
    min_balance: { type: Number, required: true },
    max_balance: { type: Number, required: true }
});

const UserLevel = model('UserLevel', userLevelSchema);
export default UserLevel
