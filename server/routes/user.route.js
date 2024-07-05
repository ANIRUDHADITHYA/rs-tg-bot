import express from "express";
import { claimButton, createUser, getAllFriend, startMining } from "../controllers/user.controller.js";

const router = express.Router();

//user auth endpoints

router.post('/create-user', createUser);
router.post('/start-mining', startMining);
router.post('/claim', claimButton);

router.get('/friends/:telegram_id', getAllFriend);

export { router as UserRouter };