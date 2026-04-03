/**
 * Data Index for Thời Gian Luận
 */

const liunianData = require('./liunian_data');
const chonNgayData = require('./chon_ngay_data');
const metadataExpanded = require('./metadata_expanded');

module.exports = {
    liunianData,
    chonNgayData,
    metadataExpanded,
    ...liunianData,
    ...chonNgayData,
    ...metadataExpanded
};
