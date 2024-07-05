import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Loader from '../Loader/Loader';
import "./Friends.css";
import { UserContext } from '../../ContextAPI/UserWrapper';
import toast, { Toaster } from 'react-hot-toast';

export default function Friends() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const [referralLink, setReferralLink] = useState("");

    useEffect(() => {
        const fetchFriends = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/api/friends/${user.telegram_id}`);
                const data = response.data;

                if (response.status === 200) {
                    setFriends(data.friends);
                    // Generate referral link in frontend
                    setReferralLink(`https://yourdomain.com/register?ref=${user.telegram_id}`);
                } else {
                    console.error('Error fetching friends:', data.message);
                }
            } catch (error) {
                console.error('Server error:', error);
            }

            setLoading(false);
        };

        fetchFriends();
    }, [user]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Copied to clipboard!");
    };

    const shareToTelegram = () => {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20this%20awesome%20platform!`;
        window.open(shareUrl, "_blank");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='friends-section'>
            <Toaster />
            <Navbar />
            <div className='friend-title-container'>
                <h1>Invite friends!</h1>
                <p>You and your friend will receive bonuses</p>
            </div>
            <div className='friend-table-header'>
                <p>List of your friends</p>
                <i className="fa-solid fa-rotate-left"></i>
            </div>
            <div className='invite-friend-section'>
                {friends.length ? friends.map((friend, index) => (
                    <div className='invite-friend-details' key={index}>
                        <img src='/Asserts/invite.png' className='friend-logo' alt='Friend Logo' />
                        <h3>{friend.telegram_username || friend.telegram_id}</h3>
                        <div className='invite-bonus-container'>
                            <img src='/Asserts/invite-coin.png' alt='Invite Coin' />
                            <p>+1K</p>
                        </div>
                    </div>
                )) : <p className='friend-not-found '>Invite Friends and get Referal Bonus</p>}
            </div>
            <div className='invite-friend-link-section'>
                <div className='invite-friend-link-container'>
                    <div className='invite-friend-link' onClick={shareToTelegram}>
                        <p>Invite a friend </p>
                        <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div className='copy-to-clipboard' onClick={copyToClipboard}>
                        <i className="fa-regular fa-copy"></i>
                    </div>
                </div>
            </div>

        </div>

    );
}
