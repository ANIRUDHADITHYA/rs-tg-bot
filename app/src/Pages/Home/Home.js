import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../ContextAPI/UserWrapper';
import { feedLevels, userLevel } from '../../Utils/global';

export default function Home() {
    const { user, setUser } = useContext(UserContext);
    const [totalBalance, setTotalBalance] = useState(0);
    const [storageBalance, setStorageBalance] = useState(0);
    const [isStorageFull, setIsStorageFull] = useState(false);
    const [claimable, setClaimable] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [alertLevel, setAlertLevel] = useState(false)

    useEffect(() => {
        if (user) {
            setTotalBalance(user.available_balance);
        }
    }, [user]);

    useEffect(() => {
        const fetchCurrentTimestamp = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getCurrentTimestamp');
                const currentTime = response.data.timestamp;

                const curent_mining_speed = feedLevels.find(speed => speed.level === user.mining_speed.feed.level).speed;
                const storageCapacity = (new Date(user.storage.next_claim_end).getTime() - new Date(user.storage.next_claim_start).getTime()) / 1000 / 3600 * curent_mining_speed;

                const elapsedTime = currentTime - new Date(user.storage.next_claim_start).getTime();
                let newBalance = Math.min(elapsedTime / 1000 / 3600 * curent_mining_speed, storageCapacity);
                setStorageBalance(newBalance);
                setIsStorageFull(newBalance >= storageCapacity);
                setClaimable(newBalance >= storageCapacity / 4);

                const remainingTime = Math.max(0, new Date(user.storage.next_claim_end).getTime() - currentTime);
                setCountdown(remainingTime / 1000);
            } catch (error) {
                console.error('Error fetching current timestamp:', error);
            }
        };

        if (user) {
            fetchCurrentTimestamp();
        }
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (user) {
                const curent_mining_speed = feedLevels.find(speed => speed.level === user.mining_speed.feed.level).speed;
                const storageCapacity = (new Date(user.storage.next_claim_end).getTime() - new Date(user.storage.next_claim_start).getTime()) / 1000 / 3600 * curent_mining_speed;

                setStorageBalance(prevBalance => {
                    const newBalance = Math.min(prevBalance + curent_mining_speed / 3600, storageCapacity); // Updated per second
                    setIsStorageFull(newBalance >= storageCapacity);
                    setClaimable(newBalance >= storageCapacity / 4);
                    return newBalance;
                });

                setCountdown(prevCountdown => {
                    const newCountdown = prevCountdown - 1;
                    return newCountdown <= 0 ? 0 : newCountdown;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);

    const handleClaim = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/claim', {
                telegram_id: user.telegram_id,
            });

            // Display a message if the user level has changed
            if (response.data.user.current_level > user.current_level) {
                setAlertLevel(true)
            }
            setUser(response.data.user);
        } catch (error) {
            console.error('Error claiming storage:', error);
        }
    };

    const startMining = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/start-mining', {
                telegram_id: user.telegram_id,
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error starting mining:', error);
        }
    };

    const getStorageFillWidth = () => {
        if (!user) return '0%';
        const curent_mining_speed = feedLevels.find(speed => speed.level === user.mining_speed.feed.level).speed;
        const storageCapacity = (new Date(user.storage.next_claim_end).getTime() - new Date(user.storage.next_claim_start).getTime()) / 1000 / 3600 * curent_mining_speed;
        return `${(storageBalance / storageCapacity) * 100}%`;
    };

    const formatCountdown = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className='home-section'>
            {user && !user.mining_status && (
                <div className='mining-alert'>
                    <div className='mining-alert-container'>
                        <h2>Start Mining</h2>
                        <p>Start your mining now and acquire your ROOSTERSWAP Tokens</p>
                        <button onClick={startMining}>Mine Now</button>
                    </div>
                </div>
            )}
            {alertLevel &&
                (
                    <div className='mining-alert'>
                        <div className='mining-alert-container'>
                            <h2>Congratulations!</h2>
                            <p>You have reach Level {user.current_level} {userLevel.filter(level => level.level === user.current_level)[0].name}</p>
                            <button onClick={() => { setAlertLevel(false) }}>Okay</button>
                        </div>
                    </div>
                )}

            <Navbar />
            <div className='home-container'>
                <div className='home-balance-section'>
                    <div className='home-mining-bal'>
                        <img src='/Asserts/avb.png' alt='Available Balance' />
                        <h1>{storageBalance.toFixed(2)}</h1>
                    </div>
                    <div className='home-avl-bal'>
                        <p>Total Balance</p>
                        <img src='/Asserts/avb.png' alt='Total Balance' />
                        <p>{totalBalance.toFixed(2)}</p>
                    </div>
                    <div className='level-container'>
                        <img src={`/Asserts/Levels/${user?.current_level}.png`} alt='Level' />
                        <div className='level-identifier'>
                            <p>{userLevel.filter(level => level.level === user.current_level)[0].name}</p>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div className='mining-coin-container'>
                    <img src='/Asserts/coin.png' alt='Mining Coin' />
                </div>
                <div className='daily-task-boot-combo'>
                    <Link to="/daily-bonus"><img src='/Asserts/daily.png' alt='Daily Task' /></Link>
                    <Link to="/boost"><img src='/Asserts/boost.png' alt='Boost' /></Link>
                </div>
                <div className='mining-storage'>
                    <div className='storage-fill' style={{ width: getStorageFillWidth() }}></div>
                    <img src='/Asserts/storage.png' alt='Storage' />
                    <div className='storage-info'>
                        <h3>Storage</h3>
                        <h4>{formatCountdown(countdown)} to fill</h4>
                        <p>{feedLevels.find(speed => speed.level === user.mining_speed.feed.level).speed} Tokens/Hour</p>
                    </div>
                    <button onClick={handleClaim} disabled={!claimable}>CLAIM</button>
                </div>
            </div>
        </div>
    );
}
