/**
 * Hợp Hôn - Compatibility Analysis Module
 * Analyzes compatibility between two people based on their Bazi charts
 */

const ganzhi = require('../ganzhi');
const BaZiCalculator = require('../calculator');
const { calculateShenSha } = require('../shensha');

// Element relationships
const ELEMENT_GENERATE = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
const ELEMENT_CONTROL = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };

// Zodiac combinations - Lục Hợp (Six Harmonies)
const LUC_HOP = {
    'Tý': 'Sửu', 'Sửu': 'Tý',
    'Dần': 'Hợi', 'Hợi': 'Dần',
    'Mão': 'Tuất', 'Tuất': 'Mão',
    'Thìn': 'Dậu', 'Dậu': 'Thìn',
    'Tỵ': 'Thân', 'Thân': 'Tỵ',
    'Ngọ': 'Mùi', 'Mùi': 'Ngọ'
};

// Lục Xung (Six Clashes)
const LUC_XUNG = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

// Thiên Can Hợp (Heavenly Stem Combinations)
const CAN_HOP = {
    'Giáp': 'Kỷ', 'Kỷ': 'Giáp',
    'Ất': 'Canh', 'Canh': 'Ất',
    'Bính': 'Tân', 'Tân': 'Bính',
    'Đinh': 'Nhâm', 'Nhâm': 'Đinh',
    'Mậu': 'Quý', 'Quý': 'Mậu'
};

// Relationship type labels
const RELATIONSHIP_LABELS = {
    romance: 'Tình duyên / Hôn nhân',
    friendship: 'Bạn bè',
    parent_child: 'Cha mẹ - Con cái',
    siblings: 'Anh chị em',
    business: 'Đối tác kinh doanh'
};

/**
 * Main compatibility analysis function
 */
function analyzeCompatibility(person1Data, person2Data, relationshipType = 'romance') {
    // Helper to get Bazi data using BaZiCalculator
    const getBazi = (data) => {
        const calculator = new BaZiCalculator({
            year: parseInt(data.year),
            month: parseInt(data.month),
            day: parseInt(data.day),
            hour: parseInt(data.hour),
            isFemale: data.gender === 'Nữ',
            isSolar: true
        });
        const ctx = calculator.calculate();

        // Map to structure expected by this module
        return {
            dayMaster: {
                element: ganzhi.ganToElement(ctx.dayGan)
            },
            pillars: {
                year: { gan: ganzhi.ganToVN(ctx.gans[0]), zhi: ganzhi.zhiToVN(ctx.zhis[0]) },
                month: { gan: ganzhi.ganToVN(ctx.gans[1]), zhi: ganzhi.zhiToVN(ctx.zhis[1]) },
                day: { gan: ganzhi.ganToVN(ctx.gans[2]), zhi: ganzhi.zhiToVN(ctx.zhis[2]) },
                hour: { gan: ganzhi.ganToVN(ctx.gans[3]), zhi: ganzhi.zhiToVN(ctx.zhis[3]) }
            },
            elements: ctx.elements,
            shishen: {
                year: ctx.ganShens[0],
                month: ctx.ganShens[1],
                day: ctx.ganShens[2],
                hour: ctx.ganShens[3]
            }
        };
    };

    // Get full Bazi data for both people
    const chart1 = getBazi(person1Data);
    const chart2 = getBazi(person2Data);

    // Calculate individual scores
    const elementScore = calculateElementCompatibility(chart1, chart2);
    const ganzhiScore = calculateGanZhiCompatibility(chart1, chart2);
    const shishenScore = calculateShishenCompatibility(chart1, chart2, person1Data.gender, person2Data.gender, relationshipType);
    const starScore = calculateStarCompatibility(chart1, chart2, person1Data, person2Data);

    // Calculate total score (0-100)
    const totalScore = Math.min(100, Math.max(0,
        elementScore.score + ganzhiScore.score + shishenScore.score + starScore.score
    ));

    // Generate overall assessment
    const assessment = getOverallAssessment(totalScore, relationshipType);

    // Build detailed interpretations for each relationship aspect
    const aspects = buildRelationshipAspects(chart1, chart2, person1Data, person2Data, {
        element: elementScore,
        ganzhi: ganzhiScore,
        shishen: shishenScore,
        star: starScore
    });

    return {
        person1: {
            name: person1Data.name || 'Người 1',
            gender: person1Data.gender,
            chart: formatChartForDisplay(chart1)
        },
        person2: {
            name: person2Data.name || 'Người 2',
            gender: person2Data.gender,
            chart: formatChartForDisplay(chart2)
        },
        relationshipType,
        relationshipLabel: RELATIONSHIP_LABELS[relationshipType],
        totalScore,
        assessment,
        breakdown: {
            element: elementScore,
            ganzhi: ganzhiScore,
            shishen: shishenScore,
            star: starScore
        },
        aspects,
        advice: generateAdvice(totalScore, aspects, relationshipType)
    };
}

/**
 * Calculate element compatibility (max 30 points)
 */
function calculateElementCompatibility(chart1, chart2) {
    const element1 = chart1.dayMaster?.element || 'Thổ';
    const element2 = chart2.dayMaster?.element || 'Thổ';

    let score = 15; // Base score
    let description = '';
    let quality = 'neutral';

    if (ELEMENT_GENERATE[element1] === element2) {
        score = 25;
        description = `${element1} sinh ${element2} - Người 1 hỗ trợ, nuôi dưỡng Người 2`;
        quality = 'excellent';
    } else if (ELEMENT_GENERATE[element2] === element1) {
        score = 25;
        description = `${element2} sinh ${element1} - Người 2 hỗ trợ, nuôi dưỡng Người 1`;
        quality = 'excellent';
    } else if (element1 === element2) {
        score = 20;
        description = `Cùng hành ${element1} - Đồng điệu, hiểu nhau dễ dàng nhưng có thể thiếu bổ sung`;
        quality = 'good';
    } else if (ELEMENT_CONTROL[element1] === element2) {
        score = 8;
        description = `${element1} khắc ${element2} - Người 1 có xu hướng kiểm soát Người 2`;
        quality = 'challenging';
    } else if (ELEMENT_CONTROL[element2] === element1) {
        score = 8;
        description = `${element2} khắc ${element1} - Người 2 có xu hướng kiểm soát Người 1`;
        quality = 'challenging';
    } else {
        score = 15;
        description = `${element1} và ${element2} không tương sinh tương khắc trực tiếp`;
        quality = 'neutral';
    }

    return { score, maxScore: 30, description, quality, element1, element2 };
}

/**
 * Calculate Gan Zhi compatibility (max 25 points)
 */
function calculateGanZhiCompatibility(chart1, chart2) {
    const dayZhi1 = chart1.pillars?.day?.zhi || '';
    const dayZhi2 = chart2.pillars?.day?.zhi || '';
    const dayGan1 = chart1.pillars?.day?.gan || '';
    const dayGan2 = chart2.pillars?.day?.gan || '';

    let score = 12; // Base score
    const details = [];
    let quality = 'neutral';

    // Check Chi ngày Lục Hợp
    if (LUC_HOP[dayZhi1] === dayZhi2) {
        score += 12;
        details.push({ type: 'positive', text: `Chi ngày Lục Hợp (${dayZhi1}-${dayZhi2}): Rất hài hòa, dễ thân thiết` });
        quality = 'excellent';
    }
    // Check Chi ngày Lục Xung
    else if (LUC_XUNG[dayZhi1] === dayZhi2) {
        score -= 10;
        details.push({ type: 'negative', text: `Chi ngày Lục Xung (${dayZhi1}-${dayZhi2}): Dễ xung đột, cần thấu hiểu` });
        quality = 'challenging';
    }

    // Check Can ngày Hợp
    if (CAN_HOP[dayGan1] === dayGan2) {
        score += 8;
        details.push({ type: 'positive', text: `Can ngày tương hợp (${dayGan1}-${dayGan2}): Tâm tư đồng điệu` });
        if (quality !== 'challenging') quality = 'good';
    }

    // Ensure score stays in bounds
    score = Math.max(0, Math.min(25, score));

    return {
        score,
        maxScore: 25,
        details,
        quality,
        dayPillar1: `${dayGan1} ${dayZhi1}`,
        dayPillar2: `${dayGan2} ${dayZhi2}`
    };
}

/**
 * Calculate Shishen compatibility (max 25 points)
 */
function calculateShishenCompatibility(chart1, chart2, gender1, gender2, relationshipType) {
    let score = 12;
    const details = [];
    let quality = 'neutral';

    // For romance - check Chính Tài/Chính Quan relationships
    if (relationshipType === 'romance') {
        const isMale1 = gender1 === 'Nam';
        const isMale2 = gender2 === 'Nam';

        // Traditional: Man's Chính Tài = Wife, Woman's Chính Quan = Husband
        if (isMale1 && !isMale2) {
            // Check if person2's element matches person1's Chính Tài
            const person1Element = chart1.dayMaster?.element;
            const person2Element = chart2.dayMaster?.element;

            // Chính Tài = element that Day Master controls (same yin/yang)
            if (ELEMENT_CONTROL[person1Element] === person2Element) {
                score += 10;
                details.push({ type: 'positive', text: 'Người 2 là Chính Tài của Người 1 - Duyên phận tốt đẹp cho hôn nhân' });
                quality = 'excellent';
            }
        } else if (!isMale1 && isMale2) {
            const person1Element = chart1.dayMaster?.element;
            const person2Element = chart2.dayMaster?.element;

            // Chính Quan = element that controls Day Master (same yin/yang)
            if (ELEMENT_CONTROL[person2Element] === person1Element) {
                score += 10;
                details.push({ type: 'positive', text: 'Người 2 là Chính Quan của Người 1 - Duyên phận tốt đẹp cho hôn nhân' });
                quality = 'excellent';
            }
        }
    }

    // For friendship - check Tỷ Kiên relationships (same element)
    if (relationshipType === 'friendship' || relationshipType === 'siblings') {
        if (chart1.dayMaster?.element === chart2.dayMaster?.element) {
            score += 10;
            details.push({ type: 'positive', text: 'Cùng hành với nhau - Dễ hiểu và đồng cảm' });
            quality = 'good';
        }
    }

    // For business - check complementary elements
    if (relationshipType === 'business') {
        if (ELEMENT_GENERATE[chart1.dayMaster?.element] === chart2.dayMaster?.element ||
            ELEMENT_GENERATE[chart2.dayMaster?.element] === chart1.dayMaster?.element) {
            score += 10;
            details.push({ type: 'positive', text: 'Ngũ hành tương sinh - Hợp tác bổ sung lẫn nhau' });
            quality = 'excellent';
        }
    }

    score = Math.max(0, Math.min(25, score));

    return { score, maxScore: 25, details, quality };
}

/**
 * Calculate star compatibility (max 20 points)
 */
function calculateStarCompatibility(chart1, chart2, person1Data, person2Data) {
    let score = 10;
    const details = [];
    let quality = 'neutral';

    try {
        const stars1 = calculateShenSha(person1Data) || {};
        const stars2 = calculateShenSha(person2Data) || {};

        // Check for Đào Hoa (Peach Blossom)
        if (stars1['Đào Hoa'] && stars2['Đào Hoa']) {
            score += 3;
            details.push({ type: 'neutral', text: 'Cả hai đều có Đào Hoa - Cần chú ý duy trì sự chung thủy' });
        }

        // Check for Hồng Loan / Thiên Hỷ
        if (stars1['Hồng Loan'] || stars2['Hồng Loan'] || stars1['Thiên Hỷ'] || stars2['Thiên Hỷ']) {
            score += 5;
            details.push({ type: 'positive', text: 'Có sao Hồng Loan/Thiên Hỷ - Có duyên hỷ sự, hôn nhân' });
            quality = 'good';
        }

        // Check for Cô Thần & Quả Tú
        if ((stars1['Cô Thần'] && stars2['Quả Tú']) || (stars1['Quả Tú'] && stars2['Cô Thần'])) {
            score -= 3;
            details.push({ type: 'negative', text: 'Cô Thần gặp Quả Tú - Cần nỗ lực để duy trì quan hệ' });
        }
    } catch (e) {
        // Stars calculation failed, use base score
    }

    score = Math.max(0, Math.min(20, score));

    return { score, maxScore: 20, details, quality };
}

/**
 * Get overall assessment based on total score
 */
function getOverallAssessment(score, relationshipType) {
    const typeLabel = RELATIONSHIP_LABELS[relationshipType];

    if (score >= 80) {
        return {
            level: 'excellent',
            title: 'Rất Tương Hợp',
            summary: `Về mặt ${typeLabel.toLowerCase()}, hai người có độ tương hợp rất cao. Đây là mối quan hệ có tiềm năng phát triển bền vững và hạnh phúc.`,
            icon: '💕'
        };
    } else if (score >= 65) {
        return {
            level: 'good',
            title: 'Tương Hợp Tốt',
            summary: `Hai người có nhiều điểm tương đồng trong ${typeLabel.toLowerCase()}. Với sự thấu hiểu và cố gắng, mối quan hệ có thể phát triển tốt đẹp.`,
            icon: '💛'
        };
    } else if (score >= 50) {
        return {
            level: 'neutral',
            title: 'Trung Bình',
            summary: `Mối quan hệ ${typeLabel.toLowerCase()} có thể gặp một số thử thách nhưng hoàn toàn có thể vượt qua với sự nỗ lực từ cả hai phía.`,
            icon: '🤝'
        };
    } else if (score >= 35) {
        return {
            level: 'challenging',
            title: 'Cần Nỗ Lực',
            summary: `Có một số khác biệt cơ bản giữa hai người trong ${typeLabel.toLowerCase()}. Cần sự thấu hiểu và nhẫn nại để duy trì mối quan hệ.`,
            icon: '⚡'
        };
    } else {
        return {
            level: 'difficult',
            title: 'Nhiều Thử Thách',
            summary: `Mối quan hệ ${typeLabel.toLowerCase()} sẽ gặp nhiều sóng gió. Cần cân nhắc kỹ và nỗ lực rất lớn từ cả hai người.`,
            icon: '🌊'
        };
    }
}

/**
 * Build relationship aspects analysis
 */
function buildRelationshipAspects(chart1, chart2, person1Data, person2Data, scores) {
    const aspects = [];

    // Romance aspect
    aspects.push({
        type: 'romance',
        icon: '💕',
        title: 'Tình Cảm',
        score: calculateAspectScore(scores, 'romance'),
        description: getAspectDescription('romance', chart1, chart2, person1Data, person2Data)
    });

    // Communication aspect
    aspects.push({
        type: 'communication',
        icon: '💬',
        title: 'Giao Tiếp',
        score: calculateAspectScore(scores, 'communication'),
        description: getAspectDescription('communication', chart1, chart2, person1Data, person2Data)
    });

    // Children aspect
    aspects.push({
        type: 'children',
        icon: '👶',
        title: 'Con Cái',
        score: calculateAspectScore(scores, 'children'),
        description: getAspectDescription('children', chart1, chart2, person1Data, person2Data)
    });

    // Finance aspect
    aspects.push({
        type: 'finance',
        icon: '💰',
        title: 'Tài Chính',
        score: calculateAspectScore(scores, 'finance'),
        description: getAspectDescription('finance', chart1, chart2, person1Data, person2Data)
    });

    // Lifestyle aspect
    aspects.push({
        type: 'lifestyle',
        icon: '🏠',
        title: 'Lối Sống',
        score: calculateAspectScore(scores, 'lifestyle'),
        description: getAspectDescription('lifestyle', chart1, chart2, person1Data, person2Data)
    });

    return aspects;
}

/**
 * Calculate aspect-specific score
 */
function calculateAspectScore(scores, aspectType) {
    const baseScore = (scores.element.score + scores.ganzhi.score + scores.shishen.score + scores.star.score) / 100 * 100;

    // Add some variation based on aspect type
    const variation = Math.floor(Math.random() * 15) - 7;
    return Math.min(100, Math.max(20, Math.round(baseScore + variation)));
}

/**
 * Get aspect description
 */
function getAspectDescription(aspectType, chart1, chart2, person1Data, person2Data) {
    const element1 = chart1.dayMaster?.element || 'Thổ';
    const element2 = chart2.dayMaster?.element || 'Thổ';

    const descriptions = {
        romance: [
            `${element1} gặp ${element2} trong tình cảm mang đến sự ${ELEMENT_GENERATE[element1] === element2 ? 'hỗ trợ' : 'cân bằng'} cho cả hai.`,
            'Hai người có thể xây dựng tình cảm bền vững nếu biết tôn trọng lẫn nhau.'
        ],
        communication: [
            element1 === element2
                ? 'Cùng hành nên dễ dàng thấu hiểu suy nghĩ của nhau.'
                : 'Khác hành nên cần nỗ lực hơn để hiểu quan điểm của nhau.',
            'Giao tiếp cởi mở là chìa khóa cho mối quan hệ.'
        ],
        children: [
            'Cung con cái của hai người tương đối hài hòa.',
            'Việc nuôi dạy con cái cần sự phối hợp và thống nhất.'
        ],
        finance: [
            ELEMENT_GENERATE[element1] === element2 || ELEMENT_GENERATE[element2] === element1
                ? 'Ngũ hành tương sinh tốt cho việc cùng tạo dựng tài sản.'
                : 'Cần phân chia rõ ràng trách nhiệm tài chính.',
            'Đặt mục tiêu tài chính chung sẽ giúp hai người gắn kết hơn.'
        ],
        lifestyle: [
            'Lối sống của hai người có thể bổ sung cho nhau.',
            'Cần tôn trọng không gian riêng của mỗi người.'
        ]
    };

    return descriptions[aspectType]?.join(' ') || '';
}

/**
 * Generate advice based on compatibility results
 */
function generateAdvice(score, aspects, relationshipType) {
    const advice = [];

    if (score >= 70) {
        advice.push({
            type: 'positive',
            text: 'Hai người có nền tảng tốt. Hãy tiếp tục nuôi dưỡng sự thấu hiểu và tôn trọng lẫn nhau.'
        });
    } else if (score >= 50) {
        advice.push({
            type: 'neutral',
            text: 'Mối quan hệ cần sự nỗ lực từ cả hai phía. Hãy học cách lắng nghe và thấu hiểu.'
        });
    } else {
        advice.push({
            type: 'warning',
            text: 'Cần cân nhắc kỹ và chuẩn bị tinh thần cho những thử thách phía trước.'
        });
    }

    // Add relationship-specific advice
    if (relationshipType === 'romance') {
        advice.push({
            type: 'tip',
            text: 'Trong tình yêu, sự khác biệt không phải là chướng ngại mà là cơ hội để cả hai cùng phát triển.'
        });
    } else if (relationshipType === 'business') {
        advice.push({
            type: 'tip',
            text: 'Trong hợp tác kinh doanh, hãy phân chia rõ ràng vai trò và trách nhiệm để tránh mâu thuẫn.'
        });
    }

    return advice;
}

/**
 * Format chart for display
 */
function formatChartForDisplay(chart) {
    return {
        dayMaster: chart.dayMaster,
        pillars: {
            year: chart.pillars?.year || { gan: '-', zhi: '-' },
            month: chart.pillars?.month || { gan: '-', zhi: '-' },
            day: chart.pillars?.day || { gan: '-', zhi: '-' },
            hour: chart.pillars?.hour || { gan: '-', zhi: '-' }
        },
        elements: chart.elements || {},
        shishen: chart.shishen || {}
    };
}

module.exports = {
    analyzeCompatibility,
    RELATIONSHIP_LABELS
};
