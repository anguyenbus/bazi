/**
 * Scoring Data - Detailed weights and constants for BaZi analysis
 */

module.exports = {
    // 1. Heavenly Stem (Can) Relationships
    GAN_RELATIONS: {
        '甲': { '庚': -1.5, '己': 2.0, '甲': 0.5 }, // Khắc, Hợp, Phục Ngâm
        '乙': { '辛': -1.5, '庚': 2.0, '乙': 0.5 },
        '丙': { '壬': -1.5, '辛': 2.0, '丙': 0.5 },
        '丁': { '癸': -1.5, '壬': 2.0, '丁': 0.5 },
        '戊': { '甲': -1.5, '癸': 2.0, '戊': 0.5 },
        '己': { '乙': -1.5, '甲': 2.0, '己': 0.5 },
        '庚': { '丙': -1.5, '乙': 2.0, '庚': 0.5 },
        '辛': { '丁': -1.5, '丙': 2.0, '辛': 0.5 },
        '壬': { '戊': -1.5, '丁': 2.0, '壬': 0.5 },
        '癸': { '己': -1.5, '戊': 2.0, '癸': 0.5 }
    },

    // 2. Earthly Branch (Zhi) Relationships
    ZHI_RELATIONS: {
        CHONG: { // Lục Xung
            '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥',
            '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
        },
        HE6: { // Lục Hợp
            '子': '丑', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申', '午': '未',
            '丑': '子', '亥': '寅', '戌': '卯', '酉': '辰', '申': '巳', '未': '午'
        },
        HAI: { // Lục Hại
            '子': '未', '丑': '午', '寅': '巳', '卯': '辰', '辰': '卯', '巳': '寅',
            '午': '丑', '未': '子', '申': '亥', '酉': '戌', '戌': '酉', '亥': '申'
        },
        HINH: { // Tứ Hành Xung / Tam Hình (Simplified weight)
            '寅': ['巳', '申'], '巳': ['申', '寅'], '申': ['寅', '巳'],
            '丑': ['未', 'Tuất'], '未': ['Tuất', '丑'], '戌': ['丑', '未'],
            '子': ['卯'], '卯': ['子'],
            '辰': ['辰'], '午': ['午'], '酉': ['酉'], '亥': ['亥']
        }
    },

    // 3. Complex Branch Combinations (Tam Hợp, Tam Hội)
    COMPLEX_COMBINATIONS: {
        TAM_HOP: [
            { members: ['申', '子', '辰'], element: 'Thủy', score: 3.0 },
            { members: ['亥', '卯', '未'], element: 'Mộc', score: 3.0 },
            { members: ['寅', '午', '戌'], element: 'Hỏa', score: 3.0 },
            { members: ['巳', '酉', '丑'], element: 'Kim', score: 3.0 }
        ],
        TAM_HOI: [
            { members: ['亥', '子', '丑'], element: 'Thủy', score: 4.0 },
            { members: ['寅', '卯', '辰'], element: 'Mộc', score: 4.0 },
            { members: ['巳', '午', '未'], element: 'Hỏa', score: 4.0 },
            { members: ['申', '酉', '戌'], element: 'Kim', score: 4.0 }
        ]
    },

    // 4. Weights for Natal Pillars
    PILLAR_WEIGHTS: [1.2, 1.0, 2.5, 1.2], // Năm, Tháng, Ngày (Self), Giờ

    // 5. Thập Thần Base Scores
    SHISHEN_SCORES: {
        'Tài+': 1.5, 'Tài-': 1.5, 'Quan': 1.5, 'Ấn': 1.2, 'Thực': 1.2,
        'Tỷ': 0.5, 'Kiêu': -0.5, 'Thương': -0.8, 'Kiếp': -1.2, 'Sát': -1.5
    },

    // 6. Vòng Tràng Sinh Scores
    TRANG_THAI_SCORES: {
        'Trường sinh': 1.0, 'Lâm quan': 1.2, 'Đế vượng': 1.5,
        'Mộc dục': 0.2, 'Quan đới': 0.8, 'Suy': -0.2, 'Bệnh': -0.5,
        'Tử': -1.0, 'Mộ': -0.5, 'Tuyệt': -1.5, 'Thai': 0.5, 'Dưỡng': 0.8
    },

    // 7. Energy Weights (Dụng Thần / Hỷ Thần / Kỵ Thần)
    ENERGY_WEIGHTS: {
        DUNG_THAN: 3.5,
        HY_THAN: 1.8,
        KY_THAN: -2.5,
        BINH_HOA: 0.0
    },

    // 8. Normalization Settings
    NORMALIZATION: {
        THRESHOLD_GOOD: 3.5,
        THRESHOLD_BAD: -3.5,
        LEVELS: {
            EXCELLENT: 6.5,
            GOOD: 3.5,
            NORMAL: [-3.5, 3.5],
            CAUTION: -3.5,
            DANGER: -6.5
        }
    }
};
