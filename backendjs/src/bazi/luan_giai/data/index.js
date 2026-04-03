/**
 * Data Index for Luận Giải
 */

const thapThanDeep = require('./thap_than_deep');
const massiveVariations = require('./massive_variations');
const nayin = require('./nayin');
const patterns = require('./patterns');
const personalityVariations = require('./personality_variations');
const stems = require('./stems');
const branches = require('./branches');
const careerDetail = require('./career_detail');
const healthDetail = require('./health_detail');
const relationships = require('./relationships');
const lifeEvents = require('./life_events');
const fortunes = require('./fortunes');
const advice = require('./advice');

module.exports = {
    ...thapThanDeep,
    ...massiveVariations,
    ...nayin,
    ...patterns,
    ...personalityVariations,
    ...stems,
    ...branches,
    ...careerDetail,
    ...healthDetail,
    ...relationships,
    ...lifeEvents,
    ...fortunes,
    ...advice,
};
