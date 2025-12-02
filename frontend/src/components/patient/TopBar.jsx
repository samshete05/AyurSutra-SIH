import React, { useState, useEffect } from "react";
import { Bell, UserCircle2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
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
        // Token invalid - logout
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
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
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
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default TopBar;
