import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    bonus: { type: Number, required: true },
    valid_from: { type: Date, required: true },
    valid_till: { type: Date, required: true },
    status: { type: Boolean, default: false }
});

const Task = model("Task", taskSchema);
export default Task;
