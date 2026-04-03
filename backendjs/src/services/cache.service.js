const LRUCache = require('lru-cache');

const options = {
    max: 1000, // Keep last 1000 calculations
    ttl: 1000 * 60 * 60 * 24, // 24 hours cache
    allowStale: false,
    updateAgeOnGet: true,
};

const cache = new LRUCache(options);

class CacheService {
    constructor() {
        this.cache = cache;
    }

    /**
     * Get value from cache
     * @param {string} key 
     */
    get(key) {
        return this.cache.get(key);
    }

    /**
     * Set value in cache
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        this.cache.set(key, value);
    }

    /**
     * Generate a unique cache key from parameters object
     * @param {object} params 
     */
    generateKey(params) {
        try {
            // Remove non-deterministics or irrelevant keys (e.g. name might not affect calculation if output is generic)
            // But for safety, let's include everything relevant to the calculation.
            // Bazi calculation depends on: year, month, day, hour, minute, gender, calendar.
            // Name is usually just echoed back, but if it affects "Persona" logic it might matter. 
            // Stick to core params for now.
            const { year, month, day, hour, minute, gender, calendar } = params;
            const coreParams = { year, month, day, hour, minute, gender, calendar };

            // Sort keys to ensure {a:1, b:2} == {b:2, a:1}
            return JSON.stringify(coreParams, Object.keys(coreParams).sort());
        } catch (e) {
            return JSON.stringify(params);
        }
    }

    /**
     * Wrap an async function with caching
     * @param {string} key 
     * @param {Function} asyncFn 
     */
    async getOrSet(key, asyncFn) {
        const cached = this.get(key);
        if (cached) {
            // Check if we should log hits (can be noisy)
            // console.log(`[CACHE] Hit: ${key.substring(0, 50)}...`);
            return cached;
        }

        // console.log(`[CACHE] Miss: ${key.substring(0, 50)}...`);
        const result = await asyncFn();
        this.set(key, result);
        return result;
    }
}

module.exports = new CacheService();
