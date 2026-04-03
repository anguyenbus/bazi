/**
 * KHO DỮ LIỆU LUẬN ĐỘNG (ĐẠI VẬN - LƯU NIÊN) - V4.0 - INFINITY DATA VERSE
 * "Thiên biến vạn hóa - Ứng kỳ thần diệu"
 * Chứa hàng trăm biến thể nội dung cho mọi tình huống.
 */

const LUAN_DONG_LIB = {
    meta: {
        version: "4.0",
        desc: "Dữ liệu phân tích vận hạn chuyên sâu đa chiều."
    },

    // 1. NGUYÊN TẮC LUẬN (Dùng để generate phần mở đầu ngẫu nhiên cho phong phú)
    intro_sentences: [
        "Mệnh tốt không bằng Vận tốt. Vận đến thời lai, sắt cũng thành vàng.",
        "Cây có gốc mới nở cành xanh ngọn, nước có nguồn mới biển rộng sông sâu. Vận hạn là lúc kiểm chứng cái Gốc ấy.",
        "Biết mệnh để không u mê, biết vận để nắm thời cơ. Thăng trầm là lẽ thường, quan trọng là thái độ ứng biến.",
        "Đại vận quản 10 năm thịnh suy, Lưu niên quản 1 năm cát hung. Cần xem Đại vận để định hướng, xem Lưu niên để hành động.",
        "Vận thuận thì như thuyền xuôi gió, Vận nghịch thì như ngựa lên dốc. Mỗi thời mỗi thế, đều có cách dùng riêng."
    ],

    // 2. TƯƠNG TÁC NGŨ HÀNH (VẬN vs THÂN) - CHI TIẾT HÓA
    ngu_hanh_van: {
        sinh: {
            title: "Vận Ấn Tinh (Sinh Thân)",
            general: "Giai đoạn được Thiên thời - Địa lợi nuôi dưỡng.",
            scenarios: {
                weak_day_master: [
                    "Thân Nhược gặp Vận Sinh: Như cây khô hạn gặp mưa rào (Cửu hạn phùng cam lâm). Sức khỏe hồi phục thần tốc, tinh thần minh mẫn.",
                    "Được quý nhân (người lớn tuổi, thầy, sếp) nâng đỡ, che chở.",
                    "Lợi cho việc học hành, thi cử, lấy bằng cấp, chứng chỉ, mua nhà đất.",
                    "Tâm tính trở nên điềm đạm, nhân từ, thích làm việc thiện."
                ],
                strong_day_master: [
                    "Thân Vượng gặp Vận Sinh: Như ăn quá no sinh đầy bụng (Vượng quá hóa Kỵ).",
                    "Dễ sinh tâm lý ỷ lại, lười biếng, thiếu động lực phấn đấu, sống dựa dẫm.",
                    "Suy nghĩ nhiều nhưng không hành động, bỏ lỡ cơ hội thực tế.",
                    "Sức khỏe cần đề phòng các bệnh do dư thừa (béo phì, huyết áp, mỡ máu)."
                ]
            },
            poem: "Ấn thụ trùng trùng phúc lộc toàn / Chỉ sợ thân vượng lại hóa an."
        },
        tro: {
            title: "Vận Tỷ Kiếp (Trợ Thân)",
            general: "Giai đoạn của sự Kết nối và Cạnh tranh.",
            scenarios: {
                weak_day_master: [
                    "Thân Nhược gặp Vận Trợ: Như người đi đêm có bạn đồng hành, thêm vây cánh.",
                    "Tự tin tăng cao, dám nghĩ dám làm những việc trước đây e ngại.",
                    "Hợp tác làm ăn thuận lợi, anh em bạn bè giúp sức về vốn liếng.",
                    "Sức khỏe dẻo dai, khả năng chịu áp lực tốt."
                ],
                strong_day_master: [
                    "Thân Vượng gặp Vận Trợ: Như thêm dầu vào lửa, thái quá bất cập.",
                    "Cái tôi quá lớn, độc đoán chuyên quyền, không nghe lời khuyên.",
                    "Dễ xảy ra tranh chấp tài chính với bạn bè, anh em, đồng nghiệp.",
                    "Vợ chồng bất hòa, nam mệnh dễ khắc vợ, nữ mệnh dễ cô độc."
                ]
            },
            poem: "Tỷ Kiên vốn là khách qua đường / Vượng thì tranh đoạt, nhược thì thương."
        },
        khac: {
            title: "Vận Quan Sát (Khắc Thân)",
            general: "Giai đoạn của Áp lực, Thử thách và Quyền lực.",
            scenarios: {
                weak_day_master: [
                    "Thân Nhược gặp Vận Khắc: Như cây non gặp bão lớn (Thân sát lưỡng đình).",
                    "Áp lực công việc đè nặng, cảm thấy bế tắc, mệt mỏi.",
                    "Dễ bị tiểu nhân quấy phá, cấp trên chèn ép, pháp luật soi xét.",
                    "Sức khỏe suy giảm nghiêm trọng, đề phòng tai nạn hình thương, dao kéo."
                ],
                strong_day_master: [
                    "Thân Vượng gặp Vận Khắc: Như ngọc thô được mài giũa thành khí (Sát ấn tương sinh).",
                    "Cơ hội thăng quan tiến chức, nắm quyền lực trong tay, lời nói có trọng lượng.",
                    "Giải quyết được những việc khó khăn mà người khác bó tay.",
                    "Nữ mệnh vượng phu, dễ gặp được người chồng tài giỏi, có địa vị."
                ]
            },
            poem: "Quan Sát đương quyền sợ thân hư / Thân cường Sát vượng hóa công hầu."
        },
        hao: {
            title: "Vận Tài Tinh (Hao Thân)",
            general: "Giai đoạn của Mục tiêu, Tài chính và Sở hữu.",
            scenarios: {
                weak_day_master: [
                    "Thân Nhược gặp Vận Tài: Như người yếu gánh nặng (Tài đa thân nhược).",
                    "Nhìn thấy cơ hội tiền bạc nhưng lực bất tòng tâm, hoặc làm ra tiền lại phải chi tiêu hết.",
                    "Vì tiền mà lao lực hại thân, hoặc vì tham cái lợi nhỏ mà mất cái phúc lớn.",
                    "Nam mệnh dễ vì phụ nữ mà gặp rắc rối, hao tài tốn của."
                ],
                strong_day_master: [
                    "Thân Vượng gặp Vận Tài: Như người khỏe gánh được vàng (Thân vượng Tài vượng).",
                    "Kinh doanh phát tài, đầu tư trúng lớn, tiền bạc dồi dào.",
                    "Mở rộng được điền sản, xe cộ, nâng cao chất lượng cuộc sống.",
                    "Nam mệnh đào hoa vượng, dễ cưới được vợ đẹp hoặc có người tình giúp đỡ."
                ]
            },
            poem: "Tài tinh nhập mệnh vốn là vinh / Thân nhược tài nhiều họa tùy sinh."
        },
        tiet: {
            title: "Vận Thực Thương (Tiết Thân)",
            general: "Giai đoạn của Sáng tạo, Danh tiếng và Cống hiến.",
            scenarios: {
                weak_day_master: [
                    "Thân Nhược gặp Vận Tiết: Như ngọn đèn cạn dầu (Tiết khí thái quá).",
                    "Lao tâm khổ tứ, suy nghĩ nhiều mà thực tế không đạt được bao nhiêu.",
                    "Dễ bị thị phi miệng tiếng, 'họa từ miệng mà ra', bị người khác hiểu lầm.",
                    "Nữ mệnh đường tình duyên trắc trở, khắc khẩu với chồng, lo lắng vì con cái."
                ],
                strong_day_master: [
                    "Thân Vượng gặp Vận Tiết: Như dòng sông được khơi thông (Thực thương tiết tú).",
                    "Tài năng bộc lộ rực rỡ, danh tiếng vang xa, được xã hội công nhận.",
                    "Ý tưởng sáng tạo dồi dào, giải quyết vấn đề thông minh, linh hoạt.",
                    "Nữ mệnh con cái thông minh, giỏi giang, bản thân trẻ trung xinh đẹp."
                ]
            },
            poem: "Thực Thần có khí thắng Tài Quan / Văn chương cái thế, lộc đầy tràn."
        }
    },

    // 3. THẬP THẦN VẬN - 10 BIẾN THỂ CHI TIẾT
    thap_than_ung_ky: {
        "Thực Thần": {
            keywords: "Phúc lộc - Ẩm thực - Nghệ thuật",
            detail: "Vận Thực Thần là vận của 'Phúc đức'. Tâm tính trở nên ôn hòa, rộng lượng, thích hưởng thụ cuộc sống. Có duyên với ăn uống, tiệc tùng, du lịch. Tư duy nghệ thuật phát triển.",
            advice: "Hãy tận hưởng nhưng đừng sa đà. Thích hợp học thêm kỹ năng mềm, nấu ăn, nghệ thuật. Tránh lười biếng.",
            event_tags: ["Có lộc ăn", "Tăng cân", "Sinh con", "Du lịch"]
        },
        "Thương Quan": {
            keywords: "Đột phá - Phản kháng - Sáng tạo",
            detail: "Vận Thương Quan là vận của 'Biến động'. Cái tôi cá nhân trỗi dậy mạnh mẽ, ghét sự gò bó, khuôn phép. Dễ nảy sinh mâu thuẫn với cấp trên hoặc thay đổi môi trường làm việc đột ngột.",
            advice: "Kiểm soát lời nói, tránh thị phi 'vạ miệng'. Thích hợp làm nghề tự do, sáng tạo, marketing. Không nên đối đầu trực diện.",
            event_tags: ["Đổi việc", "Thị phi", "Cãi vã", "Sáng kiến mới"]
        },
        "Chính Tài": {
            keywords: "Lương bổng - Tích lũy - Gia đình",
            detail: "Vận Chính Tài là vận của 'Ổn định'. Thu nhập đến từ công việc chính, lương bổng đều đặn. Cuộc sống đi vào nề nếp, thực tế. Nam mệnh có ý định lập gia đình.",
            advice: "Quản lý tài chính chặt chẽ, tích tiểu thành đại. Thích hợp mua nhà, cưới hỏi, gửi tiết kiệm. Tránh đầu cơ.",
            event_tags: ["Tăng lương", "Kết hôn", "Mua nhà", "Ổn định"]
        },
        "Thiên Tài": {
            keywords: "Đầu tư - Kinh doanh - Đào hoa",
            detail: "Vận Thiên Tài là vận của 'Cơ hội'. Tiền bạc đến bất ngờ từ thưởng, trúng số, đầu tư lướt sóng. Quan hệ xã hội mở rộng, chi tiêu thoáng tay. Nam mệnh đào hoa rất vượng.",
            advice: "Nắm bắt thời cơ nhưng cần biết điểm dừng. Đề phòng rắc rối tình ái và cờ bạc đỏ đen.",
            event_tags: ["Trúng thưởng", "Kinh doanh phụ", "Người tình", "Hao phí"]
        },
        "Chính Quan": {
            keywords: "Thăng tiến - Danh dự - Kỷ luật",
            detail: "Vận Chính Quan là vận của 'Danh vọng'. Được cấp trên tin tưởng trao quyền, thăng chức, tăng lương. Mọi việc thuận lợi theo quy trình, pháp luật. Nữ mệnh vượng phu.",
            advice: "Giữ gìn hình ảnh, uy tín. Làm việc đúng luật. Thích hợp cầu danh, thi cử, ứng cử.",
            event_tags: ["Thăng chức", "Nhậm chức", "Bằng khen", "Lấy chồng"]
        },
        "Thất Sát": {
            keywrods: "Quyền lực - Áp lực - Đột ngột",
            detail: "Vận Thất Sát là vận của 'Sóng gió'. Áp lực công việc cực lớn, đòi hỏi phải 'thép' mới vượt qua. Nếu thành công sẽ nắm quyền sinh sát, nếu thất bại dễ gặp tai họa.",
            advice: "Rèn luyện ý chí, can đảm đối mặt. Chú ý sức khỏe, đề phòng tai nạn, bệnh cấp tính. Không nên làm việc phi pháp.",
            event_tags: ["Áp lực", "Tai nạn", "Quyền uy", "Bệnh tật"]
        },
        "Chính Ấn": {
            keywords: "Học hành - Giấy tờ - Quý nhân",
            detail: "Vận Chính Ấn là vận của 'Bảo trợ'. Được người lớn, thầy cô, cha mẹ giúp đỡ. Thuận lợi cho việc học lên cao, nghiên cứu, ký kết hợp đồng, mua bán nhà đất.",
            advice: "Trau dồi tri thức, tu dưỡng nhân phẩm. Sống chậm lại để cảm nhận. Tránh ỷ lại.",
            event_tags: ["Đi học", "Mua xe", "Xây nhà", "Quý nhân"]
        },
        "Thiên Ấn": {
            keywords: "Huyền học - Cô độc - Kỹ năng",
            detail: "Vận Thiên Ấn là vận của 'Riêng biệt'. Tư duy sắc bén, có những ý tưởng độc đáo, khác người. Thích tìm hiểu tôn giáo, tâm linh. Dễ cảm thấy cô đơn, ít người chia sẻ.",
            advice: "Phát huy sở trường chuyên môn hẹp. Thích hợp làm nghiên cứu, nghệ thuật. Tránh đa nghi, xa lánh mọi người.",
            event_tags: ["Nghiên cứu", "Tôn giáo", "Cô đơn", "Sáng chế"]
        },
        "Tỷ Kiên": {
            keywords: "Tự lực - Tách riêng - Cái tôi",
            detail: "Vận Tỷ Kiên là vận của 'Độc lập'. Muốn tự mình làm chủ, không thích làm thuê. Anh em bạn bè có sự xa cách hoặc mỗi người một hướng. Tài chính phải tự xoay sở.",
            advice: "Tin vào chính mình, rèn luyện nội lực. Thích hợp khởi nghiệp quy mô nhỏ, làm freelancer.",
            event_tags: ["Ra riêng", "Độc lập", "Xa anh em", "Tự chủ"]
        },
        "Kiếp Tài": {
            keywords: "Cạnh tranh - Mất mát - Bạn bè",
            detail: "Vận Kiếp Tài là vận của 'Tranh đoạt'. Dễ bị mất tiền vì tin người, bạn bè vay mượn không trả, hoặc bị đối thủ cạnh tranh gay gắt. Tâm tính dễ nóng vội, liều lĩnh.",
            advice: "Thận trọng trong các mối quan hệ tiền bạc. Không nên cho vay mượn, bảo lãnh. Giữ bình tĩnh trước khiêu khích.",
            event_tags: ["Hao tài", "Bị lừa", "Cãi nhau", "Mất đồ"]
        }
    },

    // 4. CHI TIẾT ĐỊA CHI (HÌNH XUNG CỤ THỂ) - NEW SECTION
    dia_chi_chi_tiet: {
        xung_ti_ngo: "Tý - Ngọ tương xung (Thủy Hỏa bất dung): Tâm tính bất an, dễ nóng nảy, thay đổi nơi ở, công việc liên quan đến giấy tờ, cảm xúc.",
        xung_suu_mui: "Sửu - Mùi tương xung (Huynh đệ tương tàn): Trở ngại trong việc đất đai, nhà cửa, họ hàng mâu thuẫn, tiêu hóa kém.",
        xung_dan_than: "Dần - Thân tương xung (Kim Mộc giao tranh): Dễ bị tai nạn xe cộ, tay chân, di chuyển nhiều, đi lại liên tục.",
        xung_mao_dau: "Mão - Dậu tương xung (Phản bội): Rắc rối chuyện tình cảm, đào hoa, thất hứa, bị người thân cận phản bội.",
        xung_thin_tuat: "Thìn - Tuất tương xung (Thiên la Địa võng): Kiện tụng, pháp luật, tranh chấp đất đai, tù tội hoặc bị gò bó.",
        xung_ty_hoi: "Tỵ - Hợi tương xung (Dịch mã): Thay đổi công việc, đi xa, xuất ngoại, bôn ba vất vả nhưng có cơ hội mới.",
    },

    // 5. CUNG VỊ TÁC ĐỘNG (Expanded)
    cung_vi: {
        tru_nam: {
            area: "GỐC RỄ & ĐẦU ĐỜI",
            meaning: "Tác động đến: Ông bà, cha mẹ, mồ mả tổ tiên, quê hương. Dễ có sự di chuyển nơi sinh sống hoặc thay đổi việc thờ cúng."
        },
        tru_thang: {
            area: "SỰ NGHIỆP & CỐT CÁCH",
            meaning: "Tác động đến: Công việc chính, sếp, đồng nghiệp, cha mẹ, anh chị em ruột. Đây là cung biến động mạnh nhất về xã hội."
        },
        tru_ngay: {
            area: "GIA ĐẠO & BẢN THÂN",
            meaning: "Tác động đến: Vợ/Chồng, tình cảm lứa đôi, sức khỏe bản thân (đặc biệt phần bụng/nội tạng). Tâm lý cá nhân."
        },
        tru_gio: {
            area: "THÀNH QUẢ & CON CÁI",
            meaning: "Tác động đến: Con cái, cấp dưới, dự án đầu tư cuối đời, sức khỏe sinh sản. Những dự định ấp ủ lâu dài."
        }
    },

    // 6. CHIẾN LƯỢC TỔNG QUAN (Lời khuyên gan ruột)
    chien_luoc_v4: {
        tan_cong: {
            name: "CHIẾN LƯỢC TẤN CÔNG (Thuận Vận)",
            desc: "Thời cơ ngàn năm có một. Thiên thời địa lợi nhân hòa.",
            actions: [
                "Mở rộng quy mô kinh doanh, đầu tư lớn.",
                "Tranh cử, ứng cử vào các vị trí lãnh đạo.",
                "Kết hôn, sinh con, xây nhà lớn.",
                "Tận dụng tối đa đòn bẩy tài chính và quan hệ."
            ]
        },
        phong_thu: {
            name: "CHIẾN LƯỢC PHÒNG THỦ (Nghịch Vận)",
            desc: "Mây đen che phủ. Giữ mình là thắng lợi.",
            actions: [
                "Thu gọn quy mô, cắt giảm chi phí không cần thiết.",
                "Không đứng tên bảo lãnh, không cho vay mượn.",
                "Tập trung học tập, rèn luyện sức khỏe, tu tâm.",
                "Làm việc thiện để tích phúc, hóa giải tai ương."
            ]
        },
        du_kich: {
            name: "CHIẾN LƯỢC DU KÍCH (Bình Vận)",
            desc: "Tích tiểu thành đại. Lấy ngắn nuôi dài.",
            actions: [
                "Duy trì ổn định công việc hiện tại.",
                "Tìm kiếm các cơ hội nhỏ, ngắn hạn.",
                "Xây dựng mối quan hệ bền vững, chậm mà chắc.",
                "Cân bằng giữa làm việc và nghỉ ngơi."
            ]
        }
    }
};

module.exports = LUAN_DONG_LIB;
