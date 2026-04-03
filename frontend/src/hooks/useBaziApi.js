import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/apiClient';
import { useLocation, useNavigate } from 'react-router-dom';

export const useBaziApi = () => {
    // Initialize from sessionStorage to prevent flash/redirect on F5
    const [data, setData] = useState(() => {
        const saved = sessionStorage.getItem('bazi_data');
        return saved ? JSON.parse(saved) : null;
    });
    const [inputParams, setInputParams] = useState(() => {
        const saved = sessionStorage.getItem('bazi_params');
        return saved ? JSON.parse(saved) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const analyze = useCallback(async (params, shouldUpdateUrl = true) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiClient.analyze(params);

            // Save to state and storage
            setData(result);
            setInputParams(params);
            sessionStorage.setItem('bazi_data', JSON.stringify(result));
            sessionStorage.setItem('bazi_params', JSON.stringify(params));

            if (shouldUpdateUrl) {
                const searchParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        searchParams.set(key, value);
                    }
                });
                navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
            }

            return result;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [location.pathname, navigate]);

    // Secondary recovery from URL if session storage is empty
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const year = searchParams.get('year');
        const month = searchParams.get('month');
        const day = searchParams.get('day');

        if (year && month && day && !data && !loading) {
            const params = {
                name: searchParams.get('name') || '',
                gender: searchParams.get('gender') || 'Nam',
                year: parseInt(year),
                month: parseInt(month),
                day: parseInt(day),
                hour: parseInt(searchParams.get('hour') || '12'),
                minute: parseInt(searchParams.get('minute') || '0'),
                calendar: searchParams.get('calendar') || 'solar'
            };
            analyze(params, false);
        }
    }, [location.search, data, loading, analyze]);

    const clearData = () => {
        setData(null);
        setInputParams(null);
        sessionStorage.removeItem('bazi_data');
        sessionStorage.removeItem('bazi_params');
        navigate('/');
    };

    return { data, inputParams, loading, error, analyze, clearData };
};
