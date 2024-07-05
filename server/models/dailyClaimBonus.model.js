import { Schema, model } from "mongoose";

const dailyClaimBonusSchema = new Schema({
    day: { type: Number, required: true },
    bonus: { type: Number, required: true }
});

const DailyClaimBonus = model("DailyClaimBonus", dailyClaimBonusSchema);
export default DailyClaimBonus;