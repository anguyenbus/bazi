/**
 * Seeded Random Utility
 * Ensures that the same input (chart + question) always produces the same output
 */

function createSeededRandom(seed) {
    // Basic hash function for strings
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // LCG pseudo-random generator
    let state = hash >>> 0; // Force unsigned 32-bit
    const next = () => {
        state = (state * 1664525 + 1013904223) >>> 0; // Force unsigned 32-bit after calculation
        return state / 4294967296;
    };

    return {
        next,
        pick: (array) => {
            if (!array || array.length === 0) return null;
            return array[Math.floor(next() * array.length)];
        },
        between: (min, max) => Math.floor(next() * (max - min + 1)) + min
    };
}

module.exports = { createSeededRandom };
