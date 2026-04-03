const BASE_URL = '/api';

export const apiClient = {
    get: async (endpoint, params = {}) => {
        // Use window.location.origin to ensure relative path matches current page
        const url = new URL(BASE_URL + endpoint, window.location.origin);

        // Append query params
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                url.searchParams.append(key, params[key]);
            }
        });

        console.log(`[API] Fetching: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },

    post: async (endpoint, data = {}) => {
        const url = new URL(BASE_URL + endpoint, window.location.origin);

        console.log(`[API] Posting: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },

    analyze: (data) => apiClient.get('/analyze', data),
    analyzeTime: (data) => apiClient.get('/analyze-time', data),
    selectDates: (data) => apiClient.get('/select-dates', data),
    matching: (data) => apiClient.post('/matching', data),
    matchingAI: (data, token) => {
        const url = new URL(BASE_URL + '/matching/ai', window.location.origin);
        return fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    try {
                        const errData = JSON.parse(text);
                        return errData; // Return error object with { error: ... } to be handled by caller
                    } catch (e) {
                        throw new Error(`Lỗi kết nối máy chủ (${res.status}). Vui lòng thử lại sau.`);
                    }
                });
            }
            return res.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    throw new Error('Phản hồi không hợp lệ từ máy chủ. Vui lòng thử lại sau.');
                }
            });
        });
    },
    askAI: (data, token) => {
        const url = new URL(BASE_URL + '/consultant/ask', window.location.origin);
        return fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.error || `API Error: ${res.status}`);
                });
            }
            return res.json();
        });
    }
};
