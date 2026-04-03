import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { API_CONFIG } from '../config/api';

const AuthContext = createContext(null);

const API_BASE = API_CONFIG.AUTH;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('auth_token'));

    const hasInitialRefresh = useRef(false);

    // Check token on mount
    useEffect(() => {
        if (!hasInitialRefresh.current) {
            hasInitialRefresh.current = true;
            // Only refresh if token exists and is not a string "null"/"undefined"
            if (token && token !== 'null' && token !== 'undefined') {
                refreshUser();
            } else {
                setLoading(false);
            }
        }
    }, [token]);

    const localLogout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        const activeToken = token || localStorage.getItem('auth_token');
        if (!activeToken || activeToken === 'null') {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/me`, {
                headers: { 'Authorization': `Bearer ${activeToken}` }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else if (res.status === 401) {
                // Session expired or invalid - silenty clear local state
                localLogout();
            } else if (res.status === 429) {
                // Rate limited - don't logout, just log a warning
                console.warn('Hệ thống đang bận (Rate limit), vui lòng thử lại sau');
            } else {
                console.warn(`Auth check returned status ${res.status}`);
            }

        } catch (error) {
            console.error('Auth check failed:', error);
            // On network error or other, still consider clearing state if it's persistent
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Đăng nhập thất bại');
        }

        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    };

    const register = async (email, password, name, captchaToken, captchaAnswer) => {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, captchaToken, captchaAnswer })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Đăng ký thất bại');
        }

        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    };

    const logout = async () => {
        const currentToken = token;
        // Always clear local state immediately for better UX
        localLogout();

        try {
            if (currentToken) {
                // Background call to notify server, don't wait/care about result
                fetch(`${API_BASE}/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${currentToken}` }
                }).catch(() => { }); // Silent catch
            }
        } catch (error) {
            // Error here is fine, we already cleared local state
        }
    };

    const updateCredits = (newCredits) => {
        if (user) {
            setUser({ ...user, credits: newCredits });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            refreshUser,
            updateCredits,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
