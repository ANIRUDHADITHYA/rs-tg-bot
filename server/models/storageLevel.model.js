import { Schema, model } from "mongoose";

const storageLevelSchema = new Schema({
    level: { type: Number, required: true },
    time: { type: Number, required: true },
    unit: { type: String, required: true },
    cost: { type: Number, required: true }
});


const StorageLevel = model("StorageLevel", storageLevelSchema)
export default StorageLevel;
