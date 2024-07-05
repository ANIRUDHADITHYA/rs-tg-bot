import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    if (location.pathname !== '/') {
      backButton.show();
      backButton.onClick(() => navigate(-1));
    } else {
      backButton.hide();
    }

    return () => {
      backButton.offClick(() => navigate(-1));
    };
  }, [location, navigate]);

  return null;
};

export default BackButton;
