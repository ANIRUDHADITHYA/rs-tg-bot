import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    for: { type: String, required: true },
    type: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    remarks: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
    telegram_id: { type: String, required: true, unique: true },
    telegram_username: { type: String, required: true, unique: true },
    referrer: { type: String, required: true },
    available_balance: { type: Number, default: 0 },
    current_level: { type: Number, default: 1 },
    mining_speed: {
        feed: { level: { type: Number, default: 1 } },
        rooster: { level: { type: Number, default: 1 } }
    },
    storage: {
        balance: { type: Number, default: 0 },
        level: { type: Number, default: 1 },
        last_claim: { type: Date, default: Date.now },
        next_claim_start: { type: Date, default: Date.now },
        next_claim_end: { type: Date, default: Date.now }
    },
    daily_claim_bonus: {
        current_day: { type: Number, default: 1 },
        last_claim: { type: Date, default: Date.now }
    },
    mining_status: { type: Boolean, default: false },
    mining_started: { type: Date, default: Date.now },
    user_transactions: [transactionSchema]
});

const User = model("User", UserSchema)
export default User;