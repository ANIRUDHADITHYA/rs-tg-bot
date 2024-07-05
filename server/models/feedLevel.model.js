import { Schema, model } from "mongoose";

const feedLevelSchema = new Schema({
    level: { type: Number, required: true },
    speed: { type: Number, required: true },
    cost: { type: Number, required: true }
});

const FeedLevel = model('FeedLevel', feedLevelSchema);

export default FeedLevel
