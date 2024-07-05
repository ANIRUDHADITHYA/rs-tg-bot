import { storageLevels, feedLevels, userLevel } from "../lib/global.js";
import User from "../models/user.model.js";


export const createUser = async (req, res) => {
    const { telegram_id, ref, telegram_username } = req.body;
    try {
        let user = await User.findOne({ telegram_id });

        if (!user) {
            user = new User({
                telegram_id,
                referrer: ref,
                telegram_username,
            });

            if (ref !== "NA") {
                const referrerUser = await User.findOne({ telegram_id: ref });
                if (!referrerUser) {
                    user.referrer = "NA";
                } else {
                    const inviteBonus = 1000;
                    referrerUser.available_balance += inviteBonus;

                    const transaction = {
                        for: "referral",
                        type: "credit",
                        to: "available_balance",
                        amount: inviteBonus,
                        remarks: `Referral Joining Bonus (${telegram_username || telegram_id})`,
                        timestamp: Date.now()
                    };

                    referrerUser.user_transactions.push(transaction);

                    try {
                        await referrerUser.save();
                    } catch (error) {
                        console.error('Error saving referrerUser with transaction:', error);
                        throw error;
                    }
                }
            }

            await user.save();
            return res.status(201).json({ message: 'User created successfully', user });
        } else {
            return res.status(200).json({ message: 'User already exists', user });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

export const startMining = async (req, res) => {
    const { telegram_id } = req.body;

    function setStorage(user) {
        const current_storage_level = storageLevels.find(storage => storage.level === user.storage.level);
        const next_claim_start = new Date();
        const next_claim_end = new Date(next_claim_start.getTime() + current_storage_level.time * 60 * 60 * 1000);

        return {
            ...user.storage,
            next_claim_start,
            next_claim_end
        };
    }

    try {
        const user = await User.findOne({ telegram_id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { telegram_id },
            {
                $set: {
                    mining_status: true,
                    mining_started: new Date(),
                    storage: setStorage(user),
                },
            },
            { new: true }
        );

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



export const claimButton = async (req, res) => {
    function getUserLevel(balance) {
        for (let i = userLevel.length - 1; i >= 0; i--) {
            if (balance >= userLevel[i].min_balance) {
                return userLevel[i].level;
            }
        }
        return 1;
    }

    function getLevelBonus(level) {
        const levelInfo = userLevel.find(l => l.level === level);
        return levelInfo ? levelInfo.bonus : 0;
    }

    function createTransaction(forType, amount, remarks) {
        return {
            for: forType,
            type: "credit",
            to: "available_balance",
            amount: amount,
            remarks: remarks,
            timestamp: Date.now()
        };
    }

    const { telegram_id } = req.body;

    try {
        const user = await User.findOne({ telegram_id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentTime = new Date().getTime();
        const miningSpeed = feedLevels.find(speed => speed.level === user.mining_speed.feed.level).speed;
        const storageCapacity = (new Date(user.storage.next_claim_end).getTime() - new Date(user.storage.next_claim_start).getTime()) / 1000 / 3600 * miningSpeed;
        const elapsedTime = currentTime - new Date(user.storage.next_claim_start).getTime();
        const newBalance = Math.min(elapsedTime / 1000 / 3600 * miningSpeed, storageCapacity);
        const current_storage_level = storageLevels.find(storage => storage.level === user.storage.level);

        user.available_balance += newBalance;
        user.storage.balance = 0;
        user.storage.last_claim = currentTime;
        user.storage.next_claim_start = currentTime;
        user.storage.next_claim_end = new Date(currentTime + current_storage_level.time * 60 * 60 * 1000);

        // Create a transaction for adding balance from storage
        const storageToAvailableTransaction = createTransaction("storage_to_available", newBalance, `storage to available (${newBalance})`);
        user.user_transactions.push(storageToAvailableTransaction);

        // Check if the user level should change
        const newLevel = getUserLevel(user.available_balance); // Function to determine the user's level based on balance
        if (newLevel > user.current_level) {
            user.current_level = newLevel;
            const bonus = getLevelBonus(newLevel); // Get the bonus for the new level
            user.available_balance += bonus;

            // Create a transaction for the level bonus
            const levelBonusTransaction = createTransaction("level_bonus", bonus, `level ${newLevel} bonus (${bonus})`);
            user.user_transactions.push(levelBonusTransaction);

            // Notify the user about the level change and bonus
            // This could be done via frontend, email, or another method
        }

        await user.save();

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllFriend = async (req, res) => {
    const { telegram_id } = req.params;

    try {
        const user = await User.findOne({ telegram_id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friends = await User.find({ referrer: telegram_id });

        return res.status(200).json({
            message: 'Friends retrieved successfully',
            friends,
        });
    } catch (error) {
        console.error('Error retrieving friends:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};