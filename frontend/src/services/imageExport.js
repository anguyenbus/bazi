import html2canvas from 'html2canvas';

// Element Colors - More vibrant
const COLORS = {
    'Giáp': '#2E7D32', 'Ất': '#43A047', 'Dần': '#2E7D32', 'Mão': '#43A047',
    'Bính': '#C62828', 'Đinh': '#E53935', 'Tỵ': '#C62828', 'Ngọ': '#E53935',
    'Mậu': '#EF6C00', 'Kỷ': '#FF9800', 'Thìn': '#EF6C00', 'Tuất': '#EF6C00', 'Sửu': '#FF9800', 'Mùi': '#FF9800',
    'Canh': '#546E7A', 'Tân': '#78909C', 'Thân': '#546E7A', 'Dậu': '#78909C',
    'Nhâm': '#1565C0', 'Quý': '#1E88E5', 'Hợi': '#1565C0', 'Tý': '#1E88E5'
};
const getColor = (text) => COLORS[text] || '#333';

const splitCanChi = (str) => {
    if (!str) return { can: '', chi: '' };
    if (Array.isArray(str)) return { can: str[0], chi: str[1] || '' };
    if (str.includes(' ')) {
        const parts = str.split(' ');
        return { can: parts[0], chi: parts[1] || '' };
    }
    const canList = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    for (const canItem of canList) {
        if (str.startsWith(canItem)) return { can: canItem, chi: str.slice(canItem.length) };
    }
    return { can: str, chi: '' };
};

const createHTMLContent = (data) => {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed; top: 0; left: -9999px;
        width: 820px; padding: 0;
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
        font-family: 'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif;
        color: #fff;
    `;

    const info = data?.thong_tin_co_ban || {};
    const pillars = data?.chi_tiet_tru || [];
    const daiVan = data?.dai_van || [];

    const yearP = pillars[0] || {};
    const monthP = pillars[1] || {};
    const dayP = pillars[2] || {};
    const hourP = pillars[3] || {};

    // Parse date
    let year = '', month = '', day = '';
    const dateStr = info.ngay_duong_lich || '';
    if (dateStr.includes('/')) {
        const dateParts = dateStr.split('/');
        day = dateParts[0] || '';
        month = dateParts[1] || '';
        year = dateParts[2] || '';
    } else if (dateStr.includes('Năm')) {
        const yearMatch = dateStr.match(/Năm\s*(\d+)/);
        const monthMatch = dateStr.match(/tháng\s*(\d+)/);
        const dayMatch = dateStr.match(/ngày\s*(\d+)/);
        year = yearMatch ? yearMatch[1] : '';
        month = monthMatch ? monthMatch[1] : '';
        day = dayMatch ? dayMatch[1] : '';
    }
    const hour = info.gio_sinh || '';

    const formatTangCan = (tc) => {
        if (!Array.isArray(tc) || !tc.length) return '<span style="opacity:0.5">—</span>';
        return tc.map(t => {
            const can = typeof t === 'object' ? t.can : t;
            return `<span style="color:${getColor(can)}; font-weight:600">${can}</span>`;
        }).join(' ');
    };

    const formatPhoTinh = (tc) => {
        if (!Array.isArray(tc) || !tc.length) return '<span style="opacity:0.5">—</span>';
        const result = tc.map(t => typeof t === 'object' ? (t.thap_than || '') : '').filter(Boolean).join(' ');
        return result || '<span style="opacity:0.5">—</span>';
    };

    // Luu Nien data
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(year) || 1990;
    let currentDaiVan = daiVan.find(dv => currentYear >= dv.nam && currentYear < dv.nam + 10) || daiVan[0];
    let luuNienData = currentDaiVan?.luu_nien || [];
    if (luuNienData.length === 0) {
        for (let i = 0; i < 10; i++) {
            const y = currentYear + i;
            const ganIdx = (y - 4) % 10;
            const zhiIdx = (y - 4) % 12;
            const GANS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
            const ZHIS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
            luuNienData.push({ nam: y, tuoi: y - birthYear, can_chi: `${GANS[ganIdx]} ${ZHIS[zhiIdx]}` });
        }
    }
    const currentDaiVanIdx = daiVan.findIndex(dv => dv === currentDaiVan);
    const nextDaiVan = daiVan[currentDaiVanIdx + 1];
    let luuNienData2 = nextDaiVan?.luu_nien || [];
    if (luuNienData2.length === 0 && luuNienData.length > 0) {
        const lastYear = luuNienData[luuNienData.length - 1]?.nam || currentYear + 9;
        for (let i = 1; i <= 10; i++) {
            const y = lastYear + i;
            const ganIdx = (y - 4) % 10;
            const zhiIdx = (y - 4) % 12;
            const GANS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
            const ZHIS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
            luuNienData2.push({ nam: y, tuoi: y - birthYear, can_chi: `${GANS[ganIdx]} ${ZHIS[zhiIdx]}` });
        }
    }

    let html = `
        <style>
            * { box-sizing: border-box; }
            .card { background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
            .t { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
            .t th, .t td { padding: 10px 8px; text-align: center; vertical-align: middle; border-bottom: 1px solid rgba(255,255,255,0.08); }
            .lbl { background: linear-gradient(90deg, rgba(212,175,55,0.15) 0%, transparent 100%); font-weight: 700; color: #D4AF37; text-align: left !important; width: 90px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-right: 2px solid rgba(212,175,55,0.3); }
            .hl { background: linear-gradient(180deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%); }
            .bazi { font-size: 32px; font-weight: 900; line-height: 1.15; padding: 15px 8px !important; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
            .section-title { background: linear-gradient(90deg, #D4AF37 0%, #aa8a2e 100%); color: #000; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 8px 15px; border-radius: 8px 8px 0 0; text-align: center; }
            .luck-cell { padding: 8px 4px !important; transition: all 0.2s; }
            .luck-cell.current { background: linear-gradient(180deg, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.1) 100%); border: 2px solid #D4AF37; border-radius: 8px; }
        </style>

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #8B7355 50%, #D4AF37 100%); padding: 25px 30px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 65px; height: 65px; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    <span style="font-size: 14px; font-weight: 900; color: #D4AF37; text-align: center; line-height: 1.1;">HUYỀN<br/>CƠ</span>
                </div>
                <div>
                    <div style="font-size: 28px; font-weight: 900; color: #1a1a2e; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 1px 2px rgba(255,255,255,0.3);">TỨ TRỤ MỆNH BÀN</div>
                    <div style="font-size: 11px; color: rgba(0,0,0,0.6); margin-top: 3px; letter-spacing: 1px;">PHÂN TÍCH BÁT TỰ CHUYÊN SÂU</div>
                </div>
            </div>
            <div style="text-align: right; font-size: 12px; color: #1a1a2e; line-height: 1.8; background: rgba(255,255,255,0.2); padding: 12px 18px; border-radius: 10px;">
                <div><b>👤</b> ${info.ten || 'Chưa nhập tên'}</div>
                <div><b>⚧</b> ${info.gioi_tinh || 'N/A'}</div>
                <div><b>📅</b> ${hour}:00 - ${day}/${month}/${year}</div>
                <div><b>🌙</b> ${info.ngay_am_lich || ''}</div>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px 25px;">
            <!-- Pillars Table -->
            <div class="card" style="margin-bottom: 15px; overflow: hidden;">
                <table class="t">
                    <tr>
                        <td class="lbl">DƯƠNG LỊCH</td>
                        <td style="font-weight: 600; color: #aaa;">${year}</td>
                        <td style="font-weight: 600; color: #aaa;">${month}</td>
                        <td class="hl" style="font-weight: 600; color: #D4AF37;">${day}</td>
                        <td style="font-weight: 600; color: #aaa;">${hour}</td>
                    </tr>
                    <tr>
                        <td class="lbl">CHỦ TINH</td>
                        <td style="color: #888; font-size: 12px;">${yearP.thap_than_can || '—'}</td>
                        <td style="color: #888; font-size: 12px;">${monthP.thap_than_can || '—'}</td>
                        <td class="hl" style="font-weight: 800; color: #D4AF37; font-size: 12px;">NHẬT CHỦ</td>
                        <td style="color: #888; font-size: 12px;">${hourP.thap_than_can || '—'}</td>
                    </tr>
                    <tr style="background: rgba(0,0,0,0.2);">
                        <td class="lbl">BÁT TỰ</td>
                        <td class="bazi"><span style="color:${getColor(yearP.can)}">${yearP.can || ''}</span><br/><span style="color:${getColor(yearP.chi)}">${yearP.chi || ''}</span></td>
                        <td class="bazi"><span style="color:${getColor(monthP.can)}">${monthP.can || ''}</span><br/><span style="color:${getColor(monthP.chi)}">${monthP.chi || ''}</span></td>
                        <td class="bazi hl"><span style="color:${getColor(dayP.can)}">${dayP.can || ''}</span><br/><span style="color:${getColor(dayP.chi)}">${dayP.chi || ''}</span></td>
                        <td class="bazi"><span style="color:${getColor(hourP.can)}">${hourP.can || ''}</span><br/><span style="color:${getColor(hourP.chi)}">${hourP.chi || ''}</span></td>
                    </tr>
                    <tr>
                        <td class="lbl">TÀNG CAN</td>
                        <td style="font-size: 12px;">${formatTangCan(yearP.tang_can)}</td>
                        <td style="font-size: 12px;">${formatTangCan(monthP.tang_can)}</td>
                        <td class="hl" style="font-size: 12px;">${formatTangCan(dayP.tang_can)}</td>
                        <td style="font-size: 12px;">${formatTangCan(hourP.tang_can)}</td>
                    </tr>
                    <tr>
                        <td class="lbl">PHÓ TINH</td>
                        <td style="font-size: 11px; color: #888;">${formatPhoTinh(yearP.tang_can)}</td>
                        <td style="font-size: 11px; color: #888;">${formatPhoTinh(monthP.tang_can)}</td>
                        <td class="hl" style="font-size: 11px; color: #888;">${formatPhoTinh(dayP.tang_can)}</td>
                        <td style="font-size: 11px; color: #888;">${formatPhoTinh(hourP.tang_can)}</td>
                    </tr>
                    <tr>
                        <td class="lbl">TRƯỜNG SINH</td>
                        <td style="font-size: 11px; color: #7986CB;">${yearP.truong_sinh || '—'}</td>
                        <td style="font-size: 11px; color: #7986CB;">${monthP.truong_sinh || '—'}</td>
                        <td class="hl" style="font-size: 11px; color: #7986CB;">${dayP.truong_sinh || '—'}</td>
                        <td style="font-size: 11px; color: #7986CB;">${hourP.truong_sinh || '—'}</td>
                    </tr>
                    <tr>
                        <td class="lbl">NẠP ÂM</td>
                        <td style="font-size: 10px; color: #9E9E9E; font-style: italic;">${yearP.nap_am || '—'}</td>
                        <td style="font-size: 10px; color: #9E9E9E; font-style: italic;">${monthP.nap_am || '—'}</td>
                        <td class="hl" style="font-size: 10px; color: #9E9E9E; font-style: italic;">${dayP.nap_am || '—'}</td>
                        <td style="font-size: 10px; color: #9E9E9E; font-style: italic;">${hourP.nap_am || '—'}</td>
                    </tr>
                </table>
            </div>

            <!-- Dai Van -->
            ${daiVan.length > 0 ? `
            <div class="card" style="margin-bottom: 12px; overflow: hidden;">
                <div class="section-title">🔮 ĐẠI VẬN</div>
                <table class="t">
                    <tr>
                        ${daiVan.slice(0, 9).map(dv => {
        const { can, chi } = splitCanChi(dv.can_chi);
        const isCurrent = currentYear >= dv.nam && currentYear < dv.nam + 10;
        return `<td class="luck-cell ${isCurrent ? 'current' : ''}">
                                <div style="font-size: 16px; font-weight: 800; color:${getColor(can)}">${can}</div>
                                <div style="font-size: 16px; font-weight: 800; color:${getColor(chi)}">${chi}</div>
                                <div style="font-size: 9px; color: #888; margin-top: 5px;">${dv.tuoi_bat_dau || ''}t · ${dv.nam || ''}</div>
                            </td>`;
    }).join('')}
                    </tr>
                </table>
            </div>
            ` : ''}

            <!-- Luu Nien -->
            <div class="card" style="margin-bottom: 12px; overflow: hidden;">
                <div class="section-title">📅 LƯU NIÊN (${currentYear} - ${currentYear + 19})</div>
                <table class="t" style="margin-bottom: 0;">
                    <tr>
                        ${luuNienData.slice(0, 10).map(ln => {
        const { can, chi } = splitCanChi(ln.can_chi);
        const isCurrent = ln.nam === currentYear;
        return `<td class="luck-cell ${isCurrent ? 'current' : ''}">
                                <div style="font-size: 14px; font-weight: 700; color:${getColor(can)}">${can}</div>
                                <div style="font-size: 14px; font-weight: 700; color:${getColor(chi)}">${chi}</div>
                                <div style="font-size: 9px; color: #666; margin-top: 3px;">${ln.nam}<br/><span style="color:#888">${ln.tuoi}t</span></div>
                            </td>`;
    }).join('')}
                    </tr>
                    ${luuNienData2.length > 0 ? `
                    <tr>
                        ${luuNienData2.slice(0, 10).map(ln => {
        const { can, chi } = splitCanChi(ln.can_chi);
        return `<td class="luck-cell">
                                <div style="font-size: 14px; font-weight: 700; color:${getColor(can)}">${can}</div>
                                <div style="font-size: 14px; font-weight: 700; color:${getColor(chi)}">${chi}</div>
                                <div style="font-size: 9px; color: #666; margin-top: 3px;">${ln.nam}<br/><span style="color:#888">${ln.tuoi}t</span></div>
                            </td>`;
    }).join('')}
                    </tr>
                    ` : ''}
                </table>
            </div>

            <!-- Footer Grid -->
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 12px;">
                <div class="card" style="padding: 15px;">
                    <div style="font-size: 10px; color: #D4AF37; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Thông Tin Bổ Sung</div>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                        <div style="display: flex; justify-content: space-between;"><span style="color: #888;">Mệnh Cung</span><span style="font-weight: 700; color: #fff;">${info.menh_cung || '—'}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="color: #888;">Thai Nguyên</span><span style="font-weight: 700; color: #fff;">${info.thai_nguyen || '—'}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="color: #888;">Niên Không</span><span style="color: #aaa;">${info.nien_khong || '—'}</span></div>
                        <div style="display: flex; justify-content: space-between;"><span style="color: #888;">Nhật Không</span><span style="color: #aaa;">${info.nhat_khong || '—'}</span></div>
                    </div>
                </div>
                <div class="card" style="overflow: hidden;">
                    <div class="section-title">⭐ THẦN SÁT NGUYÊN CỤC</div>
                    <table class="t" style="border: none;">
                        <tr style="background: rgba(255,255,255,0.03);">
                            <td style="font-size: 10px; font-weight: 700; color: #D4AF37;">NIÊN THẦN</td>
                            <td style="font-size: 10px; font-weight: 700; color: #D4AF37;">NGUYỆT THẦN</td>
                            <td style="font-size: 10px; font-weight: 700; color: #D4AF37;">NHẬT THẦN</td>
                            <td style="font-size: 10px; font-weight: 700; color: #D4AF37;">THỜI THẦN</td>
                        </tr>
                        <tr>
                            <td style="font-size: 11px; color: #ccc; line-height: 1.5;">${(yearP.than_sat || []).join('<br/>') || '—'}</td>
                            <td style="font-size: 11px; color: #ccc; line-height: 1.5;">${(monthP.than_sat || []).join('<br/>') || '—'}</td>
                            <td style="font-size: 11px; color: #ccc; line-height: 1.5;">${(dayP.than_sat || []).join('<br/>') || '—'}</td>
                            <td style="font-size: 11px; color: #ccc; line-height: 1.5;">${(hourP.than_sat || []).join('<br/>') || '—'}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: rgba(0,0,0,0.3); padding: 12px 25px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 10px; color: #666;">Lá số lập tại <span style="color: #D4AF37; font-weight: 600;">huyencobattu.com</span></div>
            <div style="display: flex; gap: 12px; font-size: 10px;">
                <span><span style="color: #78909C;">●</span> Kim</span>
                <span><span style="color: #43A047;">●</span> Mộc</span>
                <span><span style="color: #1E88E5;">●</span> Thủy</span>
                <span><span style="color: #E53935;">●</span> Hỏa</span>
                <span><span style="color: #FF9800;">●</span> Thổ</span>
            </div>
        </div>
    `;

    container.innerHTML = html;
    return container;
};

export const exportToImage = async (data) => {
    try {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'img-loading';
        loadingDiv.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;';
        loadingDiv.innerHTML = `
            <div style="width:60px;height:60px;border:3px solid #333;border-top-color:#D4AF37;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <div style="margin-top:20px;color:#D4AF37;font-weight:600;font-size:14px;">Đang tạo lá số...</div>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        `;
        document.body.appendChild(loadingDiv);

        const container = createHTMLContent(data);
        document.body.appendChild(container);
        await new Promise(r => setTimeout(r, 300));

        const canvas = await html2canvas(container, {
            scale: 2.5,
            useCORS: true,
            backgroundColor: '#1a1a2e'
        });

        document.body.removeChild(container);
        document.body.removeChild(loadingDiv);

        const link = document.createElement('a');
        const name = (data?.thong_tin_co_ban?.ten || 'LaSo').replace(/[^a-zA-Z0-9]/g, '') || 'LaSo';
        link.download = `TuTruMenhBan_${name}_${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        return true;
    } catch (err) {
        console.error("Image Export Error:", err);
        document.getElementById('img-loading')?.remove();
        alert("Lỗi xuất ảnh: " + err.message);
        return false;
    }
};
