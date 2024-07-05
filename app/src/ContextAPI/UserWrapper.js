import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Pages/Loader/Loader';

const tele = window.Telegram.WebApp;

export const UserContext = createContext();

const UserWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const telegram_id = tele.initDataUnsafe?.user?.id || 13012001;
            const telegram_username = tele.initDataUnsafe?.user?.username || tele.initDataUnsafe?.user?.first_name || 'unknown'; // Extract username or first name
            const urlParams = new URLSearchParams(window.location.search);
            const ref = urlParams.get('ref') ? urlParams.get('ref') : 'NA';

            try {
                const response = await axios.post('http://localhost:4000/api/create-user', {
                    telegram_id,
                    ref,
                    telegram_username, // Send username to backend
                });

                const data = response.data;
                if (response.status === 201 || response.status === 200) {
                    setUser(data.user);
                } else {
                    console.error('Error creating/checking user:', data.message);
                }
            } catch (error) {
                console.error('Server error:', error);
            }

            setLoading(false);
        };

        checkUser();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserWrapper;
