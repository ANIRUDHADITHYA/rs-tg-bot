import React, { useEffect, useState } from 'react';

const EnvironmentCheck = ({ children }) => {
    const [isMobileApp, setIsMobileApp] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/Telegram/i.test(userAgent) && (/Android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent))) {
            setIsMobileApp(true);
        }
    }, []);

    if (!isMobileApp) {
        return <div>Please open this application in the Telegram mobile app.</div>;
    }

    return <>{children}</>;
};

export default EnvironmentCheck;
