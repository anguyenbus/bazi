/**
 * REFINED BAZI CONSULTANT ENGINE
 * Provides highly targeted, professional answers based on Tứ Trụ analysis.
 */
const { LOGIC_POOL } = require('./logic_pool');
const { LOGIC_ATOMS } = require('./logic_atoms');
const { QUESTIONS } = require('./data');
const { injectSynonyms } = require('./synonyms');
const phanTich = require('../phan_tich');
const ganzhi = require('../ganzhi');
const { createSeededRandom } = require('../../utils/random');

/**
 * Solve a specialized question using combinatorial generation and Bazi facts.
 */
async function solveQuestion(ctx, questionId) {
    // Create a stable RNG for this user-question pair
    const seed = ctx.me + (ctx.name || '') + questionId + new Date().getHours();
    const rng = createSeededRandom(seed);

    // 1. Find the question in the 800-question database
    // 1. IMPROVED SEARCH STRATEGY
    // We try to find the question using multiple strategies to robustly handle
    // legacy backend keys, frontend typo variations, or partial matches.
    let question = null;
    const allThemes = Object.keys(QUESTIONS);
    const searchKey = String(questionId).trim();
    const searchKeyNormalized = searchKey.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Strategy A: Exact Match (Logic ID, Text, or internal ID)
    for (const theme of allThemes) {
        const found = QUESTIONS[theme].find(q =>
            q.logic === searchKey ||
            q.text === searchKey ||
            q.id === searchKey
        );
        if (found) { question = found; break; }
    }

    // Strategy B: Legacy/Prefix Logic Match (e.g. 'CAREER_SECTOR' -> 'CAREER_SECTOR_ELEMENT')
    if (!question && searchKey.includes('_')) {
        for (const theme of allThemes) {
            // Find a valid logic key that STARTS with the searchKey (Legacy key case)
            const found = QUESTIONS[theme].find(q => q.logic.startsWith(searchKey));
            if (found) { question = found; break; }
        }
    }

    // Strategy C: Normalized Text Match (Ignore case/accents)
    if (!question) {
        for (const theme of allThemes) {
            const found = QUESTIONS[theme].find(q => {
                const qNorm = q.text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return qNorm === searchKeyNormalized || qNorm.includes(searchKeyNormalized);
            });
            if (found) { question = found; break; }
        }
    }

    if (!question) {
        // Logging for debugging production issues
        console.warn(`[BAZI ENGINE] Failed to find question for ID: "${questionId}". Returning fallback.`);
        return ["Rất xin lỗi, tôi chưa tìm thấy dữ liệu cho câu hỏi này trong điển tịch Bát tự."];
    }

    // 2. Perform technical analysis
    const analysis = phanTich.runAllAnalyses(ctx);
    const metadata = (analysis.luan_tinh && analysis.luan_tinh.metadata) ? analysis.luan_tinh.metadata : {};
    const answerParagraphs = [];

    // --- STEP 1: Professional Header & Context ---
    const header = `Luận giải cho câu hỏi: ***"${question.text}"***\n\nDựa trên Thiên Can đại diện cho bản mệnh là **${ganzhi.ganToVN(ctx.me)}** và các tương tác ngũ hành trong Tứ trụ của bạn, tôi xin trình bày như sau:`;
    answerParagraphs.push(header);

    // --- STEP 2: Targeted Core Analysis ---
    const coreAnalysis = getTargetedAnalysis(ctx, analysis, metadata, question.logic, rng);
    answerParagraphs.push(coreAnalysis);

    // --- STEP 2.5: Technical Details (Stars/Palaces) - Only for STARS/NOBLE questions ---
    const showStars = question.logic.includes('STARS') || question.logic.includes('NOBLE') || question.logic.includes('QUY_NHAN');
    if (showStars && metadata.stars && metadata.stars.length > 0) {
        const foundStars = metadata.stars.filter(s => LOGIC_POOL.STARS[s]);
        if (foundStars.length > 0) {
            const starAdvice = foundStars.map(s => LOGIC_POOL.STARS[s]).join(' ');
            answerParagraphs.push(`> **Vận trình các sao:** ${starAdvice}`);
        }
    }

    // --- STEP 3: Actionable Advice - Only for FENGSHUI questions ---
    const showElementAdvice = question.logic.includes('FENGSHUI') || question.logic.includes('COLOR') || question.logic.includes('ELEMENT');
    if (showElementAdvice) {
        const meElement = metadata.day_master ? metadata.day_master.element : ganzhi.ganToElement(ctx.me);
        const advice = LOGIC_POOL.ELEMENT_ADVICE[meElement] || "Hãy giữ tâm thế vững vàng.";
        answerParagraphs.push(`**Lời khuyên từ Bát Tự:** ${advice}`);
    }

    // --- STEP 4: Closing - Removed generic closing to avoid repetition ---
    // The core analysis already contains sufficient advice

    return answerParagraphs;
}
/**
 * Maps question Logic Keys to LOGIC_POOL entries OR uses Combinatorial Builder.
 */
function getTargetedAnalysis(ctx, analysis, metadata, logicKey, rng) {
    let poolKey = logicKey;
    const theme = logicKey.split('_')[0];
    const parts = logicKey.split('_');
    const subTheme = parts[1];

    // --- GRANULAR ARCHETYPE MAPPING ---
    // We map specific logic keys to broad "Archetypes" defined in LOGIC_ATOMS
    // This allows specific logical branches for Type, Sector, Timing, etc.
    let archetype = null;
    let detail = null;

    // PARTNER Archetypes - Check FIRST before generic patterns
    if (theme === 'PARTNER') {
        if (logicKey.includes('TYPE_') || logicKey.includes('IDEAL') || logicKey.includes('SOLO') || logicKey.includes('FAMILY') || logicKey.includes('EXPAND') || logicKey.includes('PROFIT') || logicKey.includes('ACTION')) archetype = 'PARTNER_TYPE';
        else if (logicKey.includes('TIMING') || logicKey.includes('CONTRACT')) archetype = 'PARTNER_TIMING';
        else if (logicKey.includes('HURDLE') || logicKey.includes('FRAUD') || logicKey.includes('_END')) archetype = 'PARTNER_HURDLE';
        else if (logicKey.includes('ELEMENT') || logicKey.includes('COMPAT')) archetype = 'PARTNER_ELEMENT';
        else archetype = 'PARTNER_TYPE'; // Default fallback for ALL PARTNER questions
    }

    // =========================================================================
    // SPECIFIC ARCHETYPES - Question-Relevant Mappings
    // =========================================================================

    // PALACE (Vượng/Suy) questions
    else if (logicKey.includes('_PALACE_')) archetype = `${theme}_PALACE`;

    // HOANH TAI (Hoành tài) questions
    else if (logicKey.includes('_HOANH')) archetype = 'WEALTH_HOANH';

    // ELEMENT (Ngũ hành thiếu) questions - uses element condition, not strong/weak
    else if (logicKey.includes('_ELEMENT_') && (theme === 'HEALTH' || theme === 'WEALTH')) {
        archetype = `${theme}_ELEMENT`;
        // Will set condition to missing element later
    }

    // NATURE (Bản chất/Tổng quan) questions
    else if (logicKey.includes('_NATURE_')) archetype = `${theme}_NATURE`;

    // HURDLE (Khó khăn/Trở ngại) questions
    else if (logicKey.includes('_HURDLE_')) archetype = `${theme}_HURDLE`;

    // Generic archetype patterns (for non-PARTNER themes)
    else if (logicKey.includes('_TYPE_')) archetype = `${theme}_TYPE`;
    else if (logicKey.includes('_SECTOR_')) archetype = `${theme}_SECTOR`;
    else if (logicKey.includes('_TIMING_') || logicKey.includes('_YEARLY_') || logicKey.includes('_AGE_') || logicKey.includes('_LUCK_') || logicKey.includes('_CYCLE_') || logicKey.includes('_PEAK') || logicKey.includes('_WHEN')) archetype = `${theme}_TIMING`;
    else if (logicKey.includes('_STARS_') || logicKey.includes('_NOBLE_')) archetype = `${theme}_STARS`;
    else if (logicKey.includes('_LOCATION_') || logicKey.includes('_TRAVEL_')) archetype = `${theme}_LOCATION`;
    else if (theme === 'WEALTH' && (logicKey.includes('_SOURCE_') || logicKey.includes('_TYPE_'))) archetype = 'WEALTH_TYPE';

    // --- FENGSHUI ITEMS (Màu sắc, Tinh dầu, Đá, Hướng, Cây...) ---
    else if (logicKey.includes('_FENGSHUI_')) {
        // Extract the specific item type (SCENT, COLOR, DIRECTION, PLANT, STONE, etc.)
        const fsParts = logicKey.split('_FENGSHUI_');
        const itemType = fsParts[1]; // e.g., SCENT, COLOR, DIRECTION
        archetype = 'FENGSHUI'; // Main archetype
        detail = itemType; // Store item type for placeholder logic
    }

    // Fallbacks for themes with no specific archetype
    else if (logicKey.startsWith('CAREER_')) archetype = 'CAREER_TYPE';
    else if (logicKey.startsWith('WEALTH_')) archetype = 'WEALTH_GENERAL';
    else if (logicKey.startsWith('LOVE_')) archetype = 'LOVE_NATURE';
    else if (logicKey.startsWith('HEALTH_')) archetype = 'HEALTH_NATURE';
    else if (logicKey.startsWith('KIDS_')) archetype = 'KIDS_NATURE';
    else if (logicKey.startsWith('MIS_')) archetype = 'MIS_NATURE';


    // --- PREPARE BAZI FACTS FOR PLACEHOLDER INTERPOLATION ---
    // Prefer boolean flag from calculation core, fallback to string parsing
    const isWeak = (ctx.scores?.suc_manh?.la_nhuoc !== undefined)
        ? ctx.scores.suc_manh.la_nhuoc
        : (metadata.strength ? (metadata.strength.includes('Nhược') || metadata.strength.includes('Yếu')) : false);

    // --- THEME-SPECIFIC ENRICHMENT & CONDITION DETERMINATION ---
    let condition = isWeak ? 'weak' : 'strong';
    let relevantClash = null;

    // Timing Logic Update
    if (archetype && archetype.includes('TIMING')) {
        const isFavorable = (ctx.dai_van && !ctx.dai_van.la_xung);
        condition = isFavorable ? 'favorable' : 'unfavorable';
    } else if (logicKey.includes('TIMING')) {
        // Fallback legacy support
        const isFavorable = (ctx.dai_van && !ctx.dai_van.la_xung);
        condition = isFavorable ? 'favorable' : 'unfavorable';
    }
    // FENGSHUI Logic - Condition = Favorable Element (kim, moc, thuy, hoa, tho)
    else if (archetype === 'FENGSHUI') {
        const favorable = metadata.favorable_elements?.[0] || ctx.balance?.favorable?.[0] || 'Kim';
        const elementMap = { 'Kim': 'kim', 'Mộc': 'moc', 'Thủy': 'thuy', 'Hỏa': 'hoa', 'Thổ': 'tho' };
        condition = elementMap[favorable] || 'kim'; // Lowercase key for LOGIC_ATOMS
    }
    // ELEMENT (Ngũ hành thiếu) Logic - Condition = Weakest Element (Only for HEALTH/WEALTH)
    else if (archetype && archetype.includes('_ELEMENT') && theme !== 'PARTNER') {
        // Determine weakest/missing element from balance
        const weakest = ctx.balance?.weakest?.[0] || metadata.unfavorable_elements?.[0] || 'Kim';
        const elementMap = { 'Kim': 'kim', 'Mộc': 'moc', 'Thủy': 'thuy', 'Hỏa': 'hoa', 'Thổ': 'tho' };
        condition = elementMap[weakest] || 'kim'; // Use weakest element as condition
    }
    // LOCATION (Hướng) Logic - Condition = Favorable Element for direction
    else if (archetype && archetype.includes('_LOCATION')) {
        const favorable = metadata.favorable_elements?.[0] || ctx.balance?.favorable?.[0] || 'Kim';
        const elementMap = { 'Kim': 'kim', 'Mộc': 'moc', 'Thủy': 'thuy', 'Hỏa': 'hoa', 'Thổ': 'tho' };
        condition = elementMap[favorable] || 'kim'; // Direction based on favorable element
    }
    // Logic for LOVE
    else if (theme === 'LOVE') {
        relevantClash = metadata.clashes?.find(c => c.palaces.includes('Ngày (Phu quân/Bản thân)'));
        condition = relevantClash ? 'clash' : 'harmony';
    }
    // Logic for WEALTH
    else if (theme === 'WEALTH') {
        condition = isWeak ? 'weak' : 'strong';
    }

    // --- PLACEHOLDERS ---
    let placeholders = {
        '{ME_GAN}': metadata.day_master?.ganVN || ganzhi.ganToVN(ctx.me),
        '{ME_ELEMENT}': metadata.day_master?.element || ganzhi.ganToElement(ctx.me),
        '{LUCK_STATUS}': (ctx.dai_van && !ctx.dai_van.la_xung) ? "đang có sự chuyển biến tích cực" : "cần sự kiên nhẫn tích lũy",
        '{LUCK_CYCLE}': ctx.scores ? (ctx.scores.giai_doan_hien_tai || "hiện tại") : "hiện tại",
        '{FAVORABLE_ELEMENT}': metadata.favorable_elements ? metadata.favorable_elements[0] : "tương sinh",
        '{DOMINANT_GOD}': metadata.dominant_god || "Bản khí",
        '{STRENGTH_SCORE}': metadata.strength || "Trung hòa"
    };

    // Advanced placeholders
    const favorableSectors = {
        'Mộc': 'Lâm nghiệp, nông nghiệp, dệt may, giáo dục, nội thất.',
        'Hỏa': 'Năng lượng, điện tử, truyền thông, ẩm thực, làm đẹp.',
        'Thổ': 'Bất động sản, xây dựng, gốm sứ, khoáng sản, chăn nuôi.',
        'Kim': 'Cơ khí, tài chính, chứng khoán, kim hoàn, quân đội.',
        'Thủy': 'Thủy hải sản, vận tải, cảng biển, du lịch, truyền thông.'
    };
    placeholders['{FAVORABLE_SECTORS}'] = favorableSectors[placeholders['{FAVORABLE_ELEMENT}']] || "các ngành nghề tương sinh";
    placeholders['{CLASH_WARNING}'] = relevantClash ? `Cảnh báo: Cung vị này đang gặp **${relevantClash.detail}**, báo hiệu những biến động cần sự thận trọng.` : "";

    if (theme === 'LOVE') {
        placeholders['{SPOUSE_ZHI}'] = metadata.day_master ? ganzhi.zhiToVN(ctx.zhis[2]) : "Cung phối";
        placeholders['{RELATION_DETAIL}'] = relevantClash ? relevantClash.detail : "hòa hợp";
        placeholders['{ROMANCE_STARS}'] = "Đào Hoa, Hồng Loan";
        placeholders['{MALEFIC_STARS}'] = "Cô Thần, Quả Tú";
    }
    // Logic for KIDS
    else if (theme === 'KIDS') {
        placeholders['{KID_ELEMENT}'] = "Thực Thương";
        placeholders['{KID_STARS}'] = metadata.stars?.includes('Quý Nhân') ? "Thiên Ất Quý Nhân" : "Quý Thần";
    }
    else if (theme === 'WEALTH') {
        placeholders['{WEALTH_ELEMENT}'] = ganzhi.ganToElement(ganzhi.getTangCan(ctx.zhis[2])[0]?.can || ctx.me);
        placeholders['{ELEMENT_INDUSTRY}'] = favorableSectors[placeholders['{FAVORABLE_ELEMENT}']] || "kinh doanh, dịch vụ";
    }
    else if (theme.startsWith('COL') || theme.startsWith('PART')) {
        placeholders['{SOCIAL_STARS}'] = "Quý Nhân, Tỷ Kiên";
        placeholders['{MALEFIC_STARS}'] = "Thị phi, Kiếp Tài";
    }

    // --- CHECK FOR GRANULAR ATOMS FIRST ---
    if (archetype && LOGIC_ATOMS[archetype] && LOGIC_ATOMS[archetype][condition]) {
        let atoms = LOGIC_ATOMS[archetype][condition];

        // FENGSHUI: Filter `core` based on the specific item type (SCENT, COLOR, STONE, etc.)
        if (archetype === 'FENGSHUI' && detail && atoms.core) {
            const itemKeywords = {
                'SCENT': ['tinh dầu', 'mùi hương', 'hương'],
                'COLOR': ['màu sắc', 'màu'],
                'STONE': ['đá quý', 'thạch anh', 'ngọc'],
                'DIRECTION': ['hướng'],
                'PLANT': ['cây trồng', 'cây'],
                'WALLET': ['ví', 'màu sắc'],
                'OFFICE': ['văn phòng', 'bàn làm việc'],
                'BEDROOM': ['phòng ngủ', 'giường']
            };
            const keywords = itemKeywords[detail] || [];
            if (keywords.length > 0) {
                const filteredCore = atoms.core.filter(c => keywords.some(kw => c.toLowerCase().includes(kw)));
                if (filteredCore.length > 0) {
                    atoms = { ...atoms, core: filteredCore };
                }
            }
        }

        // Use Massive Variety Engine with Specific Archetype
        return buildCombinatorialParagraph(atoms, rng, placeholders);
    }

    // --- CHECK FOR THEME ATOMS SECOND ---
    if (LOGIC_ATOMS[theme] && LOGIC_ATOMS[theme][condition]) {
        return buildCombinatorialParagraph(LOGIC_ATOMS[theme][condition], rng, placeholders);
    }

    // --- FALLBACK TO STATIC POOL ---
    // Map theme codes to pool prefixes
    const themeMap = {
        'KIDS': 'CHILDREN', 'COL': 'COLLEAGUE', 'PART': 'PARTNER', 'MIS': 'MISFORTUNE'
    };
    // Helper to find pool
    const mapping = {
        'NATURE': 'NATURE', 'TYPE': 'TYPE', 'TIMING': 'TIMING', 'PALACE': 'PALACE',
        'SPOUSE': 'SPOUSE_PALACE', 'DUYEN': 'NATURE', 'RELATION': 'NATURE',
        'SECTOR': 'SECTOR', 'BODY': 'BODY', 'STARS': 'STARS_ANALYSIS'
    };
    const themePrefix = themeMap[theme] || theme;
    const mappedSub = mapping[subTheme] || 'GENERAL';
    poolKey = `${themePrefix}_${mappedSub}`;
    let pool = LOGIC_POOL[poolKey] || LOGIC_POOL[`${themePrefix}_GENERAL`];

    if (!pool) return "Dữ liệu đang được cập nhật.";

    const phrases = pool[condition] || pool['general'] || Object.values(pool)[0];
    const selectedTemplate = rng.pick(Array.isArray(phrases) ? phrases : [phrases]);

    // Star info interpolation
    if (metadata.stars && metadata.stars.length > 0) {
        const starText = metadata.stars.filter(s => LOGIC_POOL.STARS[s]).map(s => LOGIC_POOL.STARS[s]).join(' ');
        placeholders['{STAR_INFO}'] = starText || "";
    } else {
        placeholders['{STAR_INFO}'] = "";
    }

    return interpolate(selectedTemplate, placeholders);
}

/**
 * Builds a unique paragraph using combinatorial logic atoms.
 */
function buildCombinatorialParagraph(atoms, rng, placeholders) {
    // 1. Select Atoms
    // Structure: Opener -> Core -> [Nuance] -> Advice
    const opener = rng.pick(atoms.openers);
    const core = rng.pick(atoms.core);
    const advice = rng.pick(atoms.advice);

    // 30% chance to skip nuance for brevity/variety
    const useNuance = rng.next() > 0.3;
    const nuance = (useNuance && atoms.nuance) ? rng.pick(atoms.nuance) : "";

    // 2. Connector Logic (Basic)
    let sentence1 = `${opener} ${core.charAt(0).toUpperCase() + core.slice(1)}`;
    let sentence2 = useNuance ? `Điều này càng rõ nét hơn ${nuance}` : "";
    let sentence3 = `${advice}`;

    // 3. Assemble
    let fullText = [sentence1, sentence2, sentence3].filter(s => s).join(' ');

    // 4. Inject Synonyms (The "1 Million Variant" Booster)
    fullText = injectSynonyms(fullText, rng);

    // 5. Interpolate
    return interpolate(fullText, placeholders);
}

/**
 * Utility to fill placeholders in templates.
 */
function interpolate(text, placeholders) {
    let result = text;
    for (const key in placeholders) {
        result = result.replace(new RegExp(key, 'g'), placeholders[key]);
    }
    return result;
}

module.exports = { solveQuestion };
