import React, { useState, useEffect, useRef } from "react";
import { Bell, UserCircle2, LogOut, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUserProfile();
    fetchUnreadCount(); 
  }, []);

  // fetch unread notifications
  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/patient/notifications/unread/count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleNotificationsUpdate = () => {
      fetchUnreadCount();
    };
  
    window.addEventListener('notificationsUpdated', handleNotificationsUpdate);
    return () => {
      window.removeEventListener('notificationsUpdated', handleNotificationsUpdate);
    };
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/patient/getProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.message === 'Success') {
        setUser(data.profile);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;

    const token = localStorage.getItem('authToken');
    
    try {
      await fetch('http://localhost:3000/patient/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    navigate('/patient/my-profile');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
      <div className="md:hidden">
        <button className="p-2 rounded-lg border border-slate-200">
          <span className="sr-only">Open sidebar</span>
          <div className="w-4 h-0.5 bg-slate-700 mb-1" />
          <div className="w-4 h-0.5 bg-slate-700 mb-1" />
          <div className="w-4 h-0.5 bg-slate-700" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <button 
          onClick={() => navigate('/patient/notifications')}
          className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="View notifications"
        >
          <Bell size={20} className="stroke-[1.8]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-bold animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex cursor-pointer items-center gap-3 hover:bg-slate-50 rounded-lg px-3 py-2 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {loading ? 'Loading...' : user?.name || 'Guest User'}
              </p>
              <p className="text-xs text-slate-500">
                {user?.role === 'patient' ? 'Patient' : user?.role || 'User'}
              </p>
            </div>
            <div className="relative">
              {user?.profileImg ? (
                <img 
                  src={user.profileImg} 
                  alt="Profile" 
                  className="h-9 w-9 rounded-full bg-slate-300 object-cover"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
                  <UserCircle2 size={24} className="text-emerald-700" />
                </div>
              )}
            </div>
            <ChevronDown 
              size={16} 
              className={`text-slate-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              <button
                onClick={handleViewProfile}
                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <User size={18} />
                <span className="font-medium">View Profile</span>
              </button>
              <div className="h-px bg-slate-200 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
