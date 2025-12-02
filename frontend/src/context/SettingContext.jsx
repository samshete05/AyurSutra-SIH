import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'english',
    textSize: 100,
    timezone: 'ist',
    dateFormat: 'DD/MM/YYYY'
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  // Apply settings to DOM
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a'; // slate-900
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; // slate-50
    }
  }, [settings.darkMode]);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const resp = await axios.get('http://localhost:3000/patient/getSettings', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (resp.data.message === 'Success') {
        setSettings(resp.data.settings);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setLoading(false);
    }
  };

  const updateSettings = async (updates) => {
    try {
      const token = localStorage.getItem('authToken');
      const resp = await axios.put(
        'http://localhost:3000/patient/updateSettings',
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (resp.data.message === 'Settings_Updated') {
        setSettings(prev => ({ ...prev, ...updates }));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating settings:', err);
      return false;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
