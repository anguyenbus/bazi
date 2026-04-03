import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WATERMARK = 'huyencobattu.com';

/**
 * Create SVG Radar Chart
 */
const createRadarSVG = (scores) => {
    const elements = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
    const colors = ['#2ecc71', '#e74c3c', '#f1c40f', '#bdc3c7', '#3498db'];
    const values = elements.map(e => scores[e] || 0);
    const maxScore = Math.max(...values, 1);

    const size = 160;
    const cx = size / 2, cy = size / 2;
    const radius = 50;
    const angleStep = (2 * Math.PI) / 5;

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;

    for (let layer = 4; layer >= 1; layer--) {
        const r = (layer / 4) * radius;
        let points = '';
        for (let i = 0; i < 5; i++) {
            const angle = i * angleStep - Math.PI / 2;
            points += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
        }
        svg += `<polygon points="${points}" fill="none" stroke="#333" stroke-width="0.5"/>`;
    }

    let dataPoints = '';
    const pointsData = [];
    for (let i = 0; i < 5; i++) {
        const r = (values[i] / maxScore) * radius;
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        dataPoints += `${x},${y} `;
        pointsData.push({ x, y, color: colors[i] });
    }
    svg += `<polygon points="${dataPoints}" fill="rgba(212,175,55,0.25)" stroke="#d4af37" stroke-width="2"/>`;

    for (let i = 0; i < 5; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const lx = cx + (radius + 18) * Math.cos(angle);
        const ly = cy + (radius + 18) * Math.sin(angle);
        svg += `<circle cx="${pointsData[i].x}" cy="${pointsData[i].y}" r="3" fill="${colors[i]}"/>`;
        svg += `<text x="${lx}" y="${ly - 3}" fill="${colors[i]}" font-size="9" font-weight="700" text-anchor="middle">${elements[i]}</text>`;
        svg += `<text x="${lx}" y="${ly + 8}" fill="#666" font-size="8" text-anchor="middle">${values[i]}</text>`;
    }

    svg += `</svg>`;
    return svg;
};

const getElementClass = (val) => {
    if (!val) return '';
    const map = {
        'Giáp': 'wood', 'Ất': 'wood', 'Dần': 'wood', 'Mão': 'wood',
        'Bính': 'fire', 'Đinh': 'fire', 'Tỵ': 'fire', 'Ngọ': 'fire',
        'Mậu': 'earth', 'Kỷ': 'earth', 'Thìn': 'earth', 'Tuất': 'earth', 'Sửu': 'earth', 'Mùi': 'earth',
        'Canh': 'metal', 'Tân': 'metal', 'Thân': 'metal', 'Dậu': 'metal',
        'Nhâm': 'water', 'Quý': 'water', 'Hợi': 'water', 'Tý': 'water',
    };
    return map[val] || '';
};

/**
 * Create PDF HTML content matching web layout
 */
const createPDFContent = (data, options) => {
    const container = document.createElement('div');
    container.id = 'pdf-export-container';
    container.style.cssText = `
        position: fixed; top: 0; left: -9999px;
        width: 800px; padding: 20px;
        background: #0a0a0a;
        font-family: 'Be Vietnam Pro', 'Inter', Arial, sans-serif;
        color: #fff;
    `;

    const info = data?.thong_tin_co_ban || {};
    const pillars = data?.chi_tiet_tru || [];
    const nguHanh = data?.diem_so?.ngu_hanh_vn || {};
    const diemSo = data?.diem_so || {};

    let html = `
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            
            /* Font Standardization */
            .text-xs { font-size: 7px; }
            .text-sm { font-size: 8px; }
            .text-base { font-size: 9px; }
            .text-md { font-size: 10px; }
            .text-lg { font-size: 12px; }
            .text-xl { font-size: 16px; }

            .font-bold { font-weight: 700; }
            .font-extrabold { font-weight: 800; }
            
            .header { background: linear-gradient(135deg, #d4af37, #aa8a2e); padding: 14px 20px; border-radius: 6px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
            .header .title { color: #000; font-size: 16px; font-weight: 800; letter-spacing: 2px; }
            .header .subtitle { color: rgba(0,0,0,0.6); font-size: 9px; }
            .header .info { color: #000; font-size: 9px; text-align: right; }
            
            .main-row { display: flex; gap: 16px; margin-bottom: 14px; }
            .info-left { flex: 3; }
            .info-right { flex: 1; }
            
            .section-title { text-align: center; color: #d4af37; font-size: 12px; font-weight: 700; letter-spacing: 2px; margin-bottom: 12px; }
            
            .info-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 10px; }
            .info-box { background: #111; border: 1px solid #222; border-radius: 6px; padding: 8px 10px; }
            .info-box.highlight { border-color: #d4af37; background: rgba(212,175,55,0.05); }
            .info-box .label { font-size: 7px; color: #666; text-transform: uppercase; margin-bottom: 3px; }
            .info-box .value { font-size: 10px; font-weight: 600; color: #fff; }
            .info-box .value.gold { color: #d4af37; }
            
            .radar-section { background: #111; border: 1px solid #222; border-radius: 6px; padding: 10px; text-align: center; }
            .radar-title { color: #d4af37; font-size: 10px; font-weight: 700; margin-bottom: 5px; }
            
            .nap-am-title { text-align: center; color: #d4af37; font-size: 10px; margin-bottom: 8px; }
            .nap-am-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; }
            .nap-am-item { background: linear-gradient(135deg, #1a2a1a, #1a1a1a); border-radius: 20px; padding: 10px 6px; text-align: center; border: 1px solid #334433; }
            .nap-am-label { font-size: 7px; color: #666; margin-bottom: 3px; }
            .nap-am-value { font-size: 9px; font-weight: 600; color: #7cb87c; }
            
            .strength-row { display: flex; gap: 10px; margin-bottom: 14px; align-items: center; }
            .strength-badge { background: linear-gradient(135deg, #8b0000, #dc143c); padding: 8px 14px; border-radius: 20px; }
            .strength-badge.strong { background: linear-gradient(135deg, #006400, #228b22); }
            .strength-badge .text { color: #fff; font-size: 10px; font-weight: 700; }
            .stat-box { background: #111; border: 1px solid #222; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
            .stat-box .label { color: #666; font-size: 8px; }
            .stat-box .val { color: #fff; font-size: 12px; font-weight: 700; }
            .stat-box.temp { border-color: #3498db; }
            .stat-box.temp .val { color: #3498db; }
            
            .elements-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 20px; }
            .el-box { background: #111; border: 2px solid; border-radius: 6px; padding: 10px 6px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px; }
            .el-box.metal { border-color: #bdc3c7; }
            .el-box.wood { border-color: #2ecc71; }
            .el-box.water { border-color: #3498db; }
            .el-box.fire { border-color: #e74c3c; }
            .el-box.earth { border-color: #f1c40f; }
            .el-box .icon { font-size: 8px; color: #666; }
            .el-box .name { font-size: 9px; font-weight: 600; }
            .el-box .score { font-size: 12px; font-weight: 800; }
            
            .wood { color: #2ecc71; }
            .fire { color: #e74c3c; }
            .earth { color: #f1c40f; }
            .metal { color: #bdc3c7; }
            .water { color: #3498db; }
            
            .bazi-header { background: linear-gradient(135deg, #0d4d4d, #1a6666); padding: 12px; text-align: center; border-radius: 6px; margin-bottom: 14px; }
            .bazi-header .text { color: #fff; font-size: 13px; font-weight: 700; letter-spacing: 3px; }
            
            .pillars-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 14px; }
            .pillar-card { background: #111; border: 1px solid #222; border-radius: 8px; padding: 10px 6px; text-align: center; }
            .pillar-card.main { border-color: #d4af37; background: rgba(212,175,55,0.05); }
            .pillar-label { font-size: 7px; color: #666; margin-bottom: 8px; letter-spacing: 0.5px; }
            .pillar-can { font-size: 16px; font-weight: 800; line-height: 1.1; }
            .pillar-sep { font-size: 8px; color: #333; margin: 2px 0; }
            .pillar-chi { font-size: 16px; font-weight: 800; line-height: 1.1; margin-bottom: 8px; }
            .pillar-shishen { font-size: 8px; color: #d4af37; font-weight: 600; margin-bottom: 2px; }
            .pillar-tang { font-size: 7px; color: #555; }
            
            .analysis-section { margin-bottom: 16px; background: #111; border: 1px solid #222; border-radius: 8px; overflow: hidden; }
            .analysis-header { background: #1a1a1a; padding: 10px 16px; border-left: 3px solid #d4af37; color: #d4af37; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
            .analysis-header.fire { border-left-color: #e74c3c; color: #e74c3c; }
            .analysis-header.gold { border-left-color: #f1c40f; color: #f1c40f; }
            .analysis-body { padding: 12px 16px; }
            .analysis-row { margin-bottom: 10px; }
            .analysis-label { display: block; color: #666; font-size: 8px; font-weight: 700; margin-bottom: 4px; text-transform: uppercase; }
            .analysis-label.gold { color: #d4af37; }
            .analysis-content { color: #aaa; font-size: 9px; line-height: 1.5; }
            .analysis-item { margin-bottom: 6px; color: #888; font-size: 8px; line-height: 1.4; }
            
            .matrix-line { margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #1a1a1a; }
            .matrix-label { color: #d4af37; font-size: 9px; font-weight: 600; display: block; margin-bottom: 3px; }
            .matrix-text { color: #888; font-size: 8px; line-height: 1.5; display: block; }
            
            .watermark { text-align: center; color: #d4af37; font-size: 8px; margin-top: 15px; opacity: 0.6; }
        </style>
    `;

    // Header
    html += `
        <div class="header">
            <div><div class="title">HUYỀN CƠ BÁT TỰ</div><div class="subtitle">Tứ Trụ Mệnh Lý</div></div>
            <div class="info">${info.ngay_duong_lich || ''} | ${new Date().toLocaleDateString('vi-VN')}</div>
        </div>
    `;

    // THÔNG TIN CƠ BẢN + Radar
    html += `
        <div class="section-title">THÔNG TIN CƠ BẢN</div>
        <div class="main-row">
            <div class="info-left">
                <div class="info-grid">
                    <div class="info-box highlight"><div class="label">TÊN</div><div class="value gold">${info.ten || 'Chưa nhập'}</div></div>
                    <div class="info-box"><div class="label">GIỚI TÍNH</div><div class="value">${info.gioi_tinh || 'N/A'}</div></div>
                    <div class="info-box"><div class="label">DƯƠNG LỊCH</div><div class="value">${info.ngay_duong_lich || 'N/A'}</div></div>
                    
                    <div class="info-box"><div class="label">ÂM LỊCH</div><div class="value">${info.ngay_am_lich || 'N/A'}</div></div>
                    <div class="info-box"><div class="label">GIỜ SINH</div><div class="value">${info.gio_sinh || ''}h (giờ ${info.gio_chi || ''})</div></div>
                    <div class="info-box"><div class="label">NHẬP VẬN</div><div class="value">${info.nhap_van || 'N/A'}</div></div>
                    
                    <div class="info-box highlight"><div class="label">MỆNH CUNG</div><div class="value gold">${info.menh_cung || 'N/A'}</div></div>
                    <div class="info-box"><div class="label">THAI NGUYÊN</div><div class="value">${info.thai_nguyen || 'N/A'}</div></div>
                    <div class="info-box"><div class="label">THÂN CUNG</div><div class="value">${info.than_cung || 'N/A'}</div></div>
                    
                    <div class="info-box"><div class="label">CĂN</div><div class="value">${info.can_yeu || 'N/A'}</div></div>
                </div>
            </div>
            <div class="info-right">
                <div class="radar-section">
                    <div class="radar-title">NGŨ HÀNH</div>
                    ${createRadarSVG(nguHanh)}
                </div>
            </div>
        </div>
    `;



    // BÁT TỰ BẢN MỆNH Header
    html += `<div class="bazi-header"><span class="text">BÁT TỰ BẢN MỆNH</span></div>`;

    // 6 Pillars: Thai Nguyên, Cung Mệnh, Giờ, Ngày, Tháng, Năm
    const pillarLabels = ['THAI NGUYÊN', 'CUNG MỆNH', 'TRỤ GIỜ', 'TRỤ NGÀY', 'TRỤ THÁNG', 'TRỤ NĂM'];
    const thaiNguyen = info.thai_nguyen?.split(' ') || ['', ''];
    const menhCung = info.menh_cung?.split(' ') || ['', ''];

    const pillarData = [
        { can: thaiNguyen[0], chi: thaiNguyen[1], meta: '', tang: '' },
        { can: menhCung[0], chi: menhCung[1], meta: '', tang: '' },
        { can: pillars[3]?.can, chi: pillars[3]?.chi, meta: pillars[3]?.thap_than_can, tang: formatTangCan(pillars[3]?.tang_can), than_sat: pillars[3]?.than_sat },
        { can: pillars[2]?.can, chi: pillars[2]?.chi, meta: `NHẬT CHỦ`, tang: formatTangCan(pillars[2]?.tang_can), main: true, than_sat: pillars[2]?.than_sat },
        { can: pillars[1]?.can, chi: pillars[1]?.chi, meta: pillars[1]?.thap_than_can, tang: formatTangCan(pillars[1]?.tang_can), than_sat: pillars[1]?.than_sat },
        { can: pillars[0]?.can, chi: pillars[0]?.chi, meta: pillars[0]?.thap_than_can, tang: formatTangCan(pillars[0]?.tang_can), than_sat: pillars[0]?.than_sat },
    ];

    html += `<div class="pillars-row">`;
    pillarData.forEach((p, i) => {
        html += `
            <div class="pillar-card ${p.main ? 'main' : ''}">
                <div class="pillar-label">${pillarLabels[i]}</div>
                <div class="pillar-can ${getElementClass(p.can)}">${p.can || ''}</div>
                <div class="pillar-sep">✦</div>
                <div class="pillar-chi ${getElementClass(p.chi)}">${p.chi || ''}</div>
                <div class="pillar-shishen">${p.meta || ''}</div>
                <div class="pillar-tang">${p.tang || ''}</div>
                ${p.than_sat && p.than_sat.length ? `<div style="display:flex; flex-wrap:wrap; gap:2px; justify-content:center; margin-top:4px">${p.than_sat.slice(0, 2).map(s => `<span class="text-xs" style="background:#333; color:#f1c40f; padding:1px 2px; border-radius:2px; white-space:nowrap">${s}</span>`).join('')}</div>` : ''}
            </div>
        `;
    });
    html += `</div>`;



    // ========== 2. CẤU TRÚC (New Section) ==========
    if (options.includeChart && data?.phan_tich?.cau_truc) {
        const ct = data.phan_tich.cau_truc;
        if (!Array.isArray(ct)) { // Ensure it's the structured object
            html += `<div class="analysis-section"><div class="analysis-header" style="color:#e0e0e0; border-left-color:#888">🏗️ PHÂN TÍCH CẤU TRÚC</div><div class="analysis-body text-base">`;

            // Yin Yang
            if (ct.am_duong?.stats) {
                html += `<div class="matrix-line"><b>Âm Dương:</b> Dương (${ct.am_duong.stats.duong}) - Âm (${ct.am_duong.stats.am}) ➤ ${ct.am_duong.conclusion}</div>`;
            }

            // Thien Can items
            if (ct.thien_can?.items) {
                html += `<div style="margin-top:5px;" class="text-base"><b>Thiên Can:</b> ${ct.thien_can.items.map(i => `${i.pillar}: ${i.name}`).join(' | ')}</div>`;
            }
            if (ct.dia_chi?.items) {
                html += `<div style="margin-top:2px;" class="text-base"><b>Địa Chi:</b> ${ct.dia_chi.items.map(i => `${i.pillar}: ${i.name}`).join(' | ')}</div>`;
            }

            html += `</div></div>`;
        }
    }

    // ========== 3. THẬP THẦN (New Section) ==========
    if (options.includeChart && data?.phan_tich?.thap_than?.isStructured) {
        const tt = data.phan_tich.thap_than;
        html += `<div class="analysis-section"><div class="analysis-header" style="color:#f1c40f; border-left-color:#f1c40f">🌟 PHÂN TÍCH THẬP THẦN</div><div class="analysis-body">`;

        // CSS Grid for 10 Gods Details
        html += `<div style="display:flex; flex-direction:column; gap:10px">`;

        ['ty_kiep', 'thuc_thuong', 'tai_tinh', 'quan_sat', 'an_tinh'].forEach(k => {
            const g = tt[k];
            if (g) {
                html += `
                <div style="background:rgba(255,255,255,0.03); padding:8px 10px; border-radius:4px; border-left:2px solid #555">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px">
                        <div class="text-md font-bold" style="color:#e0e0e0">${g.title} <span style="font-weight:normal; opacity:0.7">(${g.count})</span></div>
                        ${g.list && g.list.length > 0 ? `<div class="text-xs" style="background:rgba(255,255,255,0.1); padding:2px 6px; borderRadius:3px; color:#bbb">${g.list.join(', ')}</div>` : ''}
                    </div>
                    ${g.desc ? `<div class="text-base" style="color:#999; font-style:italic; line-height:1.4">${g.desc}</div>` : ''}
                </div>
                `;
            }
        });

        html += `</div></div></div>`;
    }

    // ========== 4. QUAN HỆ CAN CHI & CẤU TRÚC (New Section) ==========
    if (options.includeChart && data?.phan_tich?.quan_he_can_chi) {
        const qh = data.phan_tich.quan_he_can_chi;
        // Render summary of Can Chi Interactions
        html += `<div class="analysis-section"><div class="analysis-header gold">🧬 QUAN HỆ CAN CHI (Tương tác)</div><div class="analysis-body text-base"><div class="matrix-line">`;

        if (qh.thien_can && qh.thien_can.length > 0) {
            html += `<div style="margin-bottom:8px"><b>🔴 Thiên Can:</b> ${qh.thien_can.map(i => `<span style="color:${i.loai && i.loai.includes('Hợp') ? '#2ecc71' : '#e74c3c'}">${i.loai} (${i.tru})</span>`).join(', ')}</div>`;
        } else {
            html += `<div style="margin-bottom:8px"><b>🔴 Thiên Can:</b> Bình hòa</div>`;
        }

        if (qh.dia_chi && qh.dia_chi.length > 0) {
            html += `<div><b>🟤 Địa Chi:</b> ${qh.dia_chi.map(i => `<span style="color:${i.loai && i.loai.includes('Hợp') ? '#3498db' : '#e74c3c'}">${i.loai} (${i.tru})</span>`).join(', ')}</div>`;
        } else {
            html += `<div><b>🟤 Địa Chi:</b> Bình hòa</div>`;
        }

        if (qh.can_khi) {
            const roots = qh.can_khi.filter(k => k.roots && k.roots.length).map(k => `<span style="color:#2ecc71">${k.can}</span>(${k.roots.map(r => r.chi).join('')})`).join(' ');
            if (roots) html += `<div style="margin-top:6px; padding-top:4px; border-top:1px dashed #333"><b>🌳 Căn khí:</b> ${roots}</div>`;
        }

        // Detailed Report Injection (Expanded)
        if (qh.luan_giai_chi_tiet) {
            const r = qh.luan_giai_chi_tiet;
            html += `<div style="margin-top:12px; padding-top:8px; border-top:1px solid #444">`;
            html += `<div class="text-base font-bold" style="color:#aaa; margin-bottom:10px; text-transform:uppercase; text-align:center">📄 LUẬN CHI TIẾT TƯƠNG TÁC</div>`;

            // Part 1: Hien Tuong
            if (r.phan_1_hien_tuong) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#e67e22; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">1. HIỆN TƯỢNG (Biểu hiện bên ngoài)</div>
                    ${r.phan_1_hien_tuong.thien_can?.length ? `<div class="text-base">• <b>Thiên Can:</b> ${r.phan_1_hien_tuong.thien_can.join(', ')}</div>` : ''}
                    ${r.phan_1_hien_tuong.dia_chi?.length ? `<div class="text-base">• <b>Địa Chi:</b> ${r.phan_1_hien_tuong.dia_chi.join(', ')}</div>` : ''}
                    ${r.phan_1_hien_tuong.noi_bat?.length ? `<div class="text-base" style="margin-top:2px; color:#ddd">➤ ${r.phan_1_hien_tuong.noi_bat.join('. ')}</div>` : ''}
                </div>`;
            }

            // Part 2: Luc Khi
            if (r.phan_2_luc_khi) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#e74c3c; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">2. LỰC KHÍ (Tác động bên trong)</div>
                     ${r.phan_2_luc_khi.goc_re?.length ? `<div class="text-base">• <b>Gốc rễ:</b> ${r.phan_2_luc_khi.goc_re.join(', ')}</div>` : ''}
                     ${r.phan_2_luc_khi.xung_pha?.length ? `<div class="text-base">• <b>Xung phá:</b> ${r.phan_2_luc_khi.xung_pha.join(', ')}</div>` : ''}
                     ${r.phan_2_luc_khi.ket_luan ? `<div class="text-base" style="margin-top:2px; color:#ddd">➤ ${r.phan_2_luc_khi.ket_luan}</div>` : ''}
                </div>`;
            }

            // Part 3: Tinh Chat
            if (r.phan_3_tinh_chat) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#9b59b6; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">3. TÍNH CHẤT (Bản chất mối quan hệ)</div>
                    ${r.phan_3_tinh_chat.quan_he?.map(i => `<div class="text-base" style="margin-bottom:2px">• <b>${i.quan_he}:</b> ${i.y_nghia}</div>`).join('')}
                    ${r.phan_3_tinh_chat.co_ngu ? `<div class="text-base" style="margin-top:4px; font-style:italic; color:#aaa">"${r.phan_3_tinh_chat.co_ngu}"</div>` : ''}
                </div>`;
            }

            // Part 4: Vi Tri
            if (r.phan_4_vi_tri) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#3498db; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">4. VỊ TRÍ (Phạm vi ảnh hưởng)</div>
                    ${r.phan_4_vi_tri.chi_tiet?.map(i => `<div class="text-base" style="margin-bottom:2px">• ${i.tru} (${i.thoi_diem}): ${i.ung_su}</div>`).join('')}
                    ${r.phan_4_vi_tri.ket_luan ? `<div class="text-base" style="margin-top:2px; color:#ddd">➤ ${r.phan_4_vi_tri.ket_luan}</div>` : ''}
                </div>`;
            }

            // Part 5: Chu Khach
            if (r.phan_5_chu_khach) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#f1c40f; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">5. CHỦ KHÁCH (Vai trò tác động)</div>
                    ${r.phan_5_chu_khach.tuong_tac?.map(i => `<div class="text-base" style="margin-bottom:2px">• <b>${i.chieu}:</b> ${i.noi_dung}</div>`).join('')}
                    <div class="text-base" style="margin-top:2px; color:#ddd">➤ Xu hướng: ${r.phan_5_chu_khach.xu_huong}</div>
                </div>`;
            }

            // Part 6: Ung Su
            if (r.phan_6_ung_su) {
                html += `<div style="margin-bottom:12px">
                    <div class="text-md font-bold" style="color:#2ecc71; border-bottom:1px solid #333; padding-bottom:2px; margin-bottom:4px">6. ỨNG SỰ (Dự báo thực tế)</div>
                    <div class="text-base">• <b>Thời điểm ứng:</b> ${r.phan_6_ung_su.ung_khi}</div>
                    ${r.phan_6_ung_su.du_bao?.map(i => `<div class="text-base" style="margin-bottom:2px">• ${i}</div>`).join('')}
                    ${r.phan_6_ung_su.co_quyet ? `<div class="text-base" style="margin-top:4px; font-style:italic; color:#aaa">"${r.phan_6_ung_su.co_quyet}"</div>` : ''}
                </div>`;
            }

            html += `</div>`;
        }

        html += `</div></div></div>`;
    }

    const formatMultiLineText = (text) => {
        if (!text) return '';
        return text.split('\n').map(line => {
            let processed = line.trim();
            if (!processed) return '<div style="height:4px"></div>';
            processed = processed.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>');
            if (processed.startsWith('♦')) return `<div class="text-base font-bold" style="margin-top:6px; border-bottom:1px solid rgba(255,255,255,0.1)">${processed.substring(1).trim()}</div>`;
            if (processed.startsWith('➤') || processed.startsWith('-') || processed.startsWith('>')) return `<div class="text-base" style="margin-left:8px; color:#bbb">• ${processed.substring(1).trim()}</div>`;
            return `<div class="text-base">${processed}</div>`;
        }).join('');
    };

    // ========== 5. NGŨ HÀNH & DỤNG THẦN (New Section) ==========
    if (options.includeChart && data?.phan_tich?.can_bang_ngu_hanh) {
        const cb = data.phan_tich.can_bang_ngu_hanh;
        html += `
            <div class="analysis-section" style="border-color: #2ecc71">
                <div class="analysis-header" style="color: #2ecc71; border-left-color: #2ecc71">💎 CÂN BẰNG NGŨ HÀNH & DỤNG THẦN</div>
                <div class="analysis-body text-base">
                    <div style="background:#1a1a1a; padding:8px; border-radius:4px; margin-bottom:8px">
                        <div class="matrix-line" style="border:none"><b style="color:#f1c40f;" class="text-md">ĐỊNH CÁCH: ${cb.nhan_dinh?.cuong_do}</b></div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;" class="text-base">
                             <div><b>Nhật chủ:</b> <span class="${getElementClass(cb.nhan_dinh?.nhat_chu)}">${cb.nhan_dinh?.nhat_chu}</span></div>
                             <div><b>Nguyệt lệnh:</b> ${cb.nhan_dinh?.nguyet_lenh} (${cb.nhan_dinh?.dac_lenh || '?'})</div>
                             <div><b>Điểm trợ:</b> ${cb.nhan_dinh?.diem_tuong_doi?.ho_tro}</div>
                             <div><b>Điểm khắc:</b> ${cb.nhan_dinh?.diem_tuong_doi?.khac_che}</div>
                        </div>
                    </div>

                    ${cb.dieu_hau?.can_thiet ? `<div class="matrix-line"><b>❄️ Điều hầu:</b> ${Array.isArray(cb.dieu_hau.can_thiet) ? cb.dieu_hau.can_thiet.join(', ') : cb.dieu_hau.can_thiet} (${cb.dieu_hau.mua_sinh})</div>` : ''}

                    <div class="matrix-line"><b style="color:#2ecc71">Dụng thần:</b> ${cb.dung_than?.ngu_hanh?.join(', ') || ''} - <i>${cb.dung_than?.y_nghia || ''}</i></div>
                    <div class="matrix-line"><b style="color:#3498db">Hỷ thần:</b> ${cb.hy_than?.ngu_hanh?.join(', ') || ''}</div>
                    <div class="matrix-line"><b style="color:#e74c3c">Kỵ thần:</b> ${cb.ky_than?.ngu_hanh?.join(', ') || ''}</div>
                    
                    ${cb.cat_hung ? `<div class="matrix-line" style="margin-top:5px; border-top:1px dashed #333; padding-top:5px"><b>Tổng quan Cát/Hung:</b> Tốt (${cb.cat_hung.gap_van_tot}) - Xấu (${cb.cat_hung.gap_van_xau})</div>` : ''}

                    <!-- NEW: Career & Health & Feng Shui -->
                    ${cb.dung_than?.nghe_nghiep ? `<div style="margin-top:10px; padding-top:10px; border-top:1px solid #333">
                        <div class="text-md font-bold" style="color:#9b59b6; margin-bottom:5px">💼 ĐỊNH HƯỚNG NGHỀ NGHIỆP</div>
                        <div class="text-base" style="color:#ccc; line-height:1.4">${formatMultiLineText(cb.dung_than.nghe_nghiep)}</div>
                    </div>` : ''}

                    ${cb.ky_than?.suc_khoe ? `<div style="margin-top:10px; padding-top:10px; border-top:1px solid #333">
                        <div class="text-md font-bold" style="color:#e74c3c; margin-bottom:5px">⚕️ SỨC KHỎE ĐÔNG Y</div>
                        <div class="text-base" style="color:#ccc; line-height:1.4">${formatMultiLineText(cb.ky_than.suc_khoe)}</div>
                    </div>` : ''}

                    ${cb.phong_thuy ? `<div style="margin-top:10px; padding:10px; background:rgba(0, 206, 201, 0.05); border:1px solid rgba(0, 206, 201, 0.2); border-radius:4px">
                        <div class="text-md font-bold" style="color:#00cec9; margin-bottom:5px">🔮 PHONG THỦY CẢI VẬN (${cb.phong_thuy.dung_than_chinh})</div>
                        <div class="text-base" style="display:grid; grid-template-columns:1fr 1fr; gap:8px">
                            ${cb.phong_thuy.loi_khuyen.split('<br/>').map(line => {
            const parts = line.split(':');
            if (parts.length < 2) return '';
            return `<div><b style="color:#81ecec">${parts[0].replace(/\*\*/g, '').trim()}:</b> <span style="color:#fff">${parts[1].trim()}</span></div>`;
        }).join('')}
                        </div>
                    </div>` : ''}

                </div>
            </div>
        `;
    }

    // ========== 6. LUẬN TĨNH (New Section) ==========
    if (options.includeLuanTinh && data?.phan_tich?.luan_tinh) {
        const lt = data.phan_tich.luan_tinh;
        html += `<div class="section-title" style="margin-top:20px; color:#9b59b6">LUẬN TĨNH (LÁ SỐ GỐC)</div><div style="display:flex; flex-direction:column; gap:10px;">`;

        const formatConclusion = (text) => {
            if (!text) return '';
            return text.split('\n').map(line => {
                let processed = line.trim();
                if (!processed) return '<div style="height:4px"></div>';

                // Bold
                processed = processed.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>');

                // Header (Diamond)
                if (processed.startsWith('♦')) {
                    return `<div class="text-base" style="color:inherit; font-weight:bold; margin-top:6px; margin-bottom:2px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:2px">${processed}</div>`;
                }
                // List items
                if (processed.startsWith('➤') || processed.startsWith('-') || processed.startsWith('>')) {
                    return `<div class="text-base" style="margin-left:8px; margin-bottom:2px; color:#bbb">• ${processed.substring(1).trim()}</div>`;
                }

                return `<div class="text-base">${processed}</div>`;
            }).join('');
        };

        const renderCard = (t, i, c, d) => {
            if (!d) return '';
            return `
                <div class="analysis-section" style="width:100%; border-color:${c}40">
                    <div class="analysis-header" style="color:${c}; border-left-color:${c}">${i} ${t}</div>
                    <div class="analysis-body">
                        ${d.conclusion ? `<div class="analysis-content text-base" style="background:${c}10; padding:10px; border-left:2px solid ${c};">${formatConclusion(d.conclusion)}</div>` : ''}
                    </div>
                </div>
             `;
        };

        html += renderCard('TÍNH CÁCH', '🧠', '#9b59b6', lt.personality);
        html += renderCard('SỰ NGHIỆP', '💰', '#f1c40f', lt.career);
        html += renderCard('HÔN NHÂN', '❤️', '#e74c3c', lt.marriage);
        html += `</div>`;
    }

    // ========== 7. LUẬN ĐỘNG (New Section) ==========
    if (options.includeLuanDong && data?.phan_tich?.luan_dong) {
        const ld = data.phan_tich.luan_dong;
        html += `<div class="section-title" style="margin-top:20px; color:#3498db">LUẬN ĐỘNG (VẬN HẠN)</div><div style="display:flex; flex-direction:column; gap:10px;">`;

        // Re-use formatConclusion or define again if scope issue
        const formatConclusion = (text) => {
            if (!text) return '';
            return text.split('\n').map(line => {
                let processed = line.trim();
                if (!processed) return '<div style="height:4px"></div>';
                processed = processed.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>');
                if (processed.startsWith('♦')) return `<div class="text-base font-bold" style="margin-top:6px; border-bottom:1px solid rgba(255,255,255,0.1)">${processed}</div>`;
                if (processed.startsWith('➤') || processed.startsWith('-') || processed.startsWith('>')) return `<div class="text-base" style="margin-left:8px; color:#bbb">• ${processed.substring(1).trim()}</div>`;
                return `<div class="text-base">${processed}</div>`;
            }).join('');
        };

        const renderDongCard = (t, i, c, d) => {
            if (!d) return '';
            return `
                <div class="analysis-section" style="width:100%; border-color:${c}40">
                    <div class="analysis-header" style="color:${c}; border-left-color:${c}">${i} ${t}</div>
                    <div class="analysis-body">
                        ${d.conclusion ? `<div class="analysis-content text-base" style="background:${c}10; padding:10px; border-left:2px solid ${c};">${formatConclusion(d.conclusion)}</div>` : ''}
                    </div>
                </div>
             `;
        };

        html += renderDongCard(`ĐẠI VẬN (${ld.dai_van?.gan || ''} ${ld.dai_van?.zhi || ''})`, '🌊', '#3498db', ld.dai_van);
        html += renderDongCard('LƯU NIÊN', '📅', '#2ecc71', ld.luu_nien);

        html += `</div>`;
    }




    html += `<div class="watermark">📜 ${WATERMARK} - Tứ Trụ Mệnh Lý Bát Tự</div>`;

    container.innerHTML = html;
    return container;
};

const formatTangCan = (tangCan) => {
    if (!tangCan || tangCan.length === 0) return '';
    return tangCan.map(t => {
        const can = typeof t === 'object' ? t.can : t;
        return can;
    }).join(' ');
};

export const exportToPDF = async (data, options = {}) => {
    showLoading();

    try {
        const container = createPDFContent(data, options);
        document.body.appendChild(container);
        await new Promise(r => setTimeout(r, 200));

        // Optimized: Lower scale (1.8 instead of 2.5) for smaller file size
        const canvas = await html2canvas(container, {
            scale: 1.8,
            backgroundColor: '#0a0a0a',
            useCORS: true,
            logging: false,
        });

        document.body.removeChild(container);

        // Use JPEG with 85% quality for much smaller file size (vs PNG)
        const imgData = canvas.toDataURL('image/jpeg', 0.85);
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

        // Add dark background to first page
        doc.setFillColor(10, 10, 10); // #0a0a0a
        doc.rect(0, 0, 210, 297, 'F');

        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            // Add dark background to each new page
            doc.setFillColor(10, 10, 10);
            doc.rect(0, 0, 210, 297, 'F');
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= 297;
        }

        const name = (data?.thong_tin_co_ban?.ten || 'LaSo').replace(/[^a-zA-Z0-9]/g, '') || 'LaSo';
        doc.save(`HuyenCoBatTu_${name}_${new Date().toISOString().split('T')[0]}.pdf`);

        return true;
    } catch (error) {
        console.error('PDF Error:', error);
        alert('Lỗi: ' + error.message);
    } finally {
        hideLoading();
    }
};

function showLoading() {
    const div = document.createElement('div');
    div.id = 'pdf-loading';
    div.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:99999;';
    div.innerHTML = '<div style="text-align:center;color:#d4af37;"><div style="font-size:40px;margin-bottom:12px;">📄</div><div style="font-size:14px;font-weight:700;">Đang tạo PDF...</div></div>';
    document.body.appendChild(div);
}

function hideLoading() {
    document.getElementById('pdf-loading')?.remove();
}

export default { exportToPDF };
