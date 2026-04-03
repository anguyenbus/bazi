/**
 * Extended Logic Atoms - Question-Specific Archetypes
 * These archetypes provide accurate, question-relevant answers
 */

const EXTENDED_ATOMS = {
    // =========================================================================
    // WEALTH ARCHETYPES - Specific
    // =========================================================================

    // PALACE (Vượng/Suy questions)
    WEALTH_PALACE: {
        strong: {
            openers: [
                "Cung Tài của bạn đang ở trạng thái **VƯỢNG**.",
                "Phân tích Tứ Trụ cho thấy cung Tài Bạch của bạn rất mạnh.",
                "Năng lượng tài khí trong lá số thuộc dạng sung túc."
            ],
            core: [
                "Cung Tài có sự hiện diện của Dụng Thần, đây là dấu hiệu tài lộc hanh thông.",
                "Thiên Can và Địa Chi hỗ trợ tốt cho vận tài, báo hiệu khả năng tích lũy cao.",
                "Đây là lá số có cung Tài vượng khí, tiền bạc đến dễ dàng hơn người khác."
            ],
            advice: [
                "Tận dụng lợi thế này bằng cách mở rộng nguồn thu nhập.",
                "Đầu tư và kinh doanh là con đường phù hợp với cung Tài vượng của bạn."
            ]
        },
        weak: {
            openers: [
                "Cung Tài của bạn đang ở trạng thái **SUY**, cần sự nỗ lực nhiều hơn.",
                "Phân tích Tứ Trụ cho thấy cung Tài Bạch cần được bổ sung năng lượng.",
                "Tài khí trong lá số thuộc dạng cần tích lũy dần dần."
            ],
            core: [
                "Cung Tài bị Kị Thần xâm phạm, tiền bạc dễ đến nhanh đi nhanh.",
                "Thiên Can và Địa Chi chưa hỗ trợ tối ưu cho vận tài, cần kiên nhẫn tích lũy.",
                "Đây là lá số cần nỗ lực trong việc quản lý tài chính."
            ],
            advice: [
                "Tập trung vào tiết kiệm và quản lý chi tiêu chặt chẽ.",
                "Tránh đầu tư mạo hiểm, ưu tiên nguồn thu nhập ổn định."
            ]
        }
    },

    // HOANH TAI (Windfall questions)
    WEALTH_HOANH: {
        strong: {
            openers: [
                "Lá số cho thấy bạn **CÓ SỐ** hoành tài (phát tài bất ngờ).",
                "Phân tích cho thấy vận trình có khả năng đón nhận tài lộc bất ngờ.",
                "Thiên cơ của bạn ẩn chứa tiềm năng hoành tài."
            ],
            core: [
                "Sự hiện diện của Thiên Tài và Dịch Mã báo hiệu khả năng phát tài từ xa hoặc đột ngột.",
                "Các năm có Thiên Can hợp Dụng Thần là thời điểm hoành tài có thể xuất hiện.",
                "Vận may về tiền bạc có thể đến từ cờ bạc, xổ số, hoặc thừa kế bất ngờ."
            ],
            advice: [
                "Tận dụng các cơ hội đầu tư khi vận may đến, nhưng vẫn phải tính toán.",
                "Hãy chuẩn bị tâm lý đón nhận những cơ hội tài chính bất ngờ."
            ]
        },
        weak: {
            openers: [
                "Lá số cho thấy tài lộc của bạn thiên về **Chính Tài** (tích lũy dần).",
                "Vận trình không báo hiệu nhiều về hoành tài, nhưng Chính Tài vững vàng.",
                "Tiền bạc đến với bạn qua nỗ lực và công việc hơn là may mắn."
            ],
            core: [
                "Không có dấu hiệu rõ ràng về hoành tài (Thiên Tài yếu hoặc bị khắc).",
                "Nguồn tài chính ổn định từ lương bổng, công việc chính là thế mạnh của bạn.",
                "Đừng kỳ vọng vào vận may bất ngờ, hãy tập trung xây dựng tài sản bền vững."
            ],
            advice: [
                "Tránh cờ bạc, xổ số hay các hình thức đầu cơ rủi ro cao.",
                "Tập trung phát triển sự nghiệp chính để tăng thu nhập ổn định."
            ]
        }
    },

    // ELEMENT (Ngũ hành thiếu questions)
    WEALTH_ELEMENT: {
        kim: {
            openers: ["Phân tích ngũ hành cho thấy lá số của bạn **THIẾU HÀNH KIM**."],
            core: ["Hành Kim (kim loại, tài chính, quyết đoán) là điểm yếu cần bổ sung. Nghề nghiệp liên quan đến Kim (ngân hàng, tài chính, cơ khí) sẽ giúp cân bằng."],
            advice: ["Mang theo vật phẩm kim loại và sử dụng màu trắng, bạc để bổ khuyết."]
        },
        moc: {
            openers: ["Phân tích ngũ hành cho thấy lá số của bạn **THIẾU HÀNH MỘC**."],
            core: ["Hành Mộc (cây cối, phát triển, sáng tạo) là điểm yếu. Nghề liên quan đến Mộc (giáo dục, nông nghiệp, gỗ) sẽ hỗ trợ."],
            advice: ["Trồng cây xanh trong nhà, mặc màu xanh lá để bổ khuyết hành Mộc."]
        },
        thuy: {
            openers: ["Phân tích ngũ hành cho thấy lá số của bạn **THIẾU HÀNH THỦY**."],
            core: ["Hành Thủy (nước, trí tuệ, linh hoạt) là điểm yếu. Nghề liên quan đến Thủy (vận tải, du lịch, xuất nhập khẩu) sẽ bổ sung."],
            advice: ["Đặt bể cá trong nhà, uống nhiều nước, mặc màu đen/xanh dương để cân bằng."]
        },
        hoa: {
            openers: ["Phân tích ngũ hành cho thấy lá số của bạn **THIẾU HÀNH HỎA**."],
            core: ["Hành Hỏa (nhiệt huyết, đam mê, danh tiếng) là điểm yếu. Nghề liên quan đến Hỏa (điện tử, truyền thông, giải trí) sẽ hỗ trợ."],
            advice: ["Thắp nến thơm, sử dụng màu đỏ/cam trong trang phục và trang trí."]
        },
        tho: {
            openers: ["Phân tích ngũ hành cho thấy lá số của bạn **THIẾU HÀNH THỔ**."],
            core: ["Hành Thổ (ổn định, chắc chắn, nền tảng) là điểm yếu. Nghề liên quan đến Thổ (bất động sản, xây dựng) sẽ cân bằng."],
            advice: ["Sử dụng đồ gốm sứ, màu vàng nâu, trồng sen đá để bổ khuyết hành Thổ."]
        }
    },

    // =========================================================================
    // HEALTH ARCHETYPES - Specific
    // =========================================================================

    HEALTH_ELEMENT: {
        kim: {
            openers: ["Ngũ hành trong lá số **THIẾU KIM**. Điều này ảnh hưởng đến phổi, da, đường hô hấp."],
            core: ["Bạn dễ gặp các vấn đề về hô hấp, da liễu, hoặc đại tràng. Hệ miễn dịch có thể yếu hơn."],
            advice: ["Bổ sung thực phẩm màu trắng (củ cải, tỏi), tập thở sâu, tránh môi trường ô nhiễm."]
        },
        moc: {
            openers: ["Ngũ hành trong lá số **THIẾU MỘC**. Điều này ảnh hưởng đến gan, mật, gân cốt."],
            core: ["Bạn dễ gặp các vấn đề về gan, mắt, hoặc căng thẳng thần kinh. Cần chú ý giải độc gan."],
            advice: ["Ăn nhiều rau xanh, tránh rượu bia, giữ tinh thần thoải mái, tập yoga/thiền."]
        },
        thuy: {
            openers: ["Ngũ hành trong lá số **THIẾU THỦY**. Điều này ảnh hưởng đến thận, bàng quang, xương."],
            core: ["Bạn dễ gặp các vấn đề về thận, hệ tiết niệu, hoặc xương khớp. Cần bổ sung nước đầy đủ."],
            advice: ["Uống đủ nước mỗi ngày, ăn đậu đen, hạt sen, tránh thức khuya."]
        },
        hoa: {
            openers: ["Ngũ hành trong lá số **THIẾU HỎA**. Điều này ảnh hưởng đến tim, mạch máu, ruột non."],
            core: ["Bạn dễ gặp các vấn đề về tim mạch, huyết áp, hoặc tiêu hóa. Tuần hoàn máu cần được chú ý."],
            advice: ["Tập thể dục đều đặn, ăn thực phẩm màu đỏ (cà chua, ớt), tránh stress."]
        },
        tho: {
            openers: ["Ngũ hành trong lá số **THIẾU THỔ**. Điều này ảnh hưởng đến dạ dày, lá lách, cơ bắp."],
            core: ["Bạn dễ gặp các vấn đề về tiêu hóa, dạ dày, hoặc cơ bắp yếu. Cần ăn uống điều độ."],
            advice: ["Ăn ngũ cốc, khoai lang, bí đỏ. Tránh ăn quá no hoặc quá đói."]
        }
    },

    HEALTH_NATURE: {
        strong: {
            openers: [
                "Sức khỏe bẩm sinh của bạn thuộc dạng **CƯỜNG TRÁNG**, thể lực sung mãn.",
                "Lá số cho thấy nền tảng sức khỏe vốn có rất tốt.",
                "Bạn được trời phú cho sức khỏe khá và khả năng hồi phục nhanh."
            ],
            core: [
                "Thân vượng khí huyết dồi dào, ít bệnh vặt, năng lượng cao.",
                "Cơ thể có khả năng tự chữa lành và phục hồi tốt sau bệnh tật.",
                "Sức đề kháng tự nhiên mạnh, ít bị ảnh hưởng bởi thời tiết thay đổi."
            ],
            advice: [
                "Duy trì lối sống lành mạnh để bảo toàn lợi thế sức khỏe.",
                "Không nên ỷ lại vào sức khỏe tốt mà bỏ qua việc chăm sóc bản thân."
            ]
        },
        weak: {
            openers: [
                "Sức khỏe bẩm sinh của bạn thuộc dạng **NHẠY CẢM**, cần được chăm sóc đặc biệt.",
                "Lá số cho thấy thể chất cần được nâng niu và bảo vệ.",
                "Bạn cần chú trọng hơn đến việc dưỡng sinh và giữ gìn sức khỏe."
            ],
            core: [
                "Thân nhược khí huyết cần bổ sung, dễ mệt mỏi nếu làm việc quá sức.",
                "Hệ miễn dịch cần được củng cố, dễ bị ảnh hưởng bởi môi trường.",
                "Cần ngủ đủ giấc, ăn uống đầy đủ chất để duy trì năng lượng."
            ],
            advice: [
                "Tập thể dục nhẹ nhàng (yoga, đi bộ), ngủ đúng giờ, ăn uống cân bằng.",
                "Khám sức khỏe định kỳ và không nên làm việc quá sức."
            ]
        }
    },

    // =========================================================================
    // LOVE ARCHETYPES - Specific
    // =========================================================================

    LOVE_NATURE: {
        harmony: {
            openers: [
                "Tình duyên của bạn thuộc dạng **PHÚC** - dễ gặp người tốt.",
                "Lá số báo hiệu vận tình cảm hanh thông, thuận lợi.",
                "Duyên phận đến với bạn nhẹ nhàng và tự nhiên."
            ],
            core: [
                "Cung Phu/Thê không bị xung khắc, tình cảm có nền tảng vững chắc.",
                "Bạn dễ thu hút người phù hợp và xây dựng mối quan hệ lành mạnh.",
                "Tình duyên là phúc đức, mang lại niềm vui và sự hỗ trợ trong cuộc sống."
            ],
            advice: [
                "Trân trọng những mối quan hệ tốt đẹp đến với bạn.",
                "Tin tưởng vào duyên số và mở lòng đón nhận tình yêu."
            ]
        },
        clash: {
            openers: [
                "Tình duyên của bạn thuộc dạng **DẠY BẢO** - cần trải qua thử thách để trưởng thành.",
                "Lá số cho thấy vận tình cảm có một số thử thách cần vượt qua.",
                "Duyên phận đến kèm theo các bài học quan trọng về tình yêu."
            ],
            core: [
                "Cung Phu/Thê có sự xung khắc, tình cảm cần sự nỗ lực để duy trì.",
                "Bạn có thể gặp trắc trở ban đầu, nhưng đây là cơ hội để học cách yêu thương.",
                "Tình duyên là nợ cần trả hoặc bài học cần học - mỗi mối quan hệ đều có ý nghĩa."
            ],
            advice: [
                "Kiên nhẫn và thấu hiểu là chìa khóa vượt qua các thử thách tình cảm.",
                "Đừng vội vàng kết hôn, hãy tìm hiểu kỹ trước khi cam kết."
            ]
        }
    },

    // =========================================================================
    // CHILDREN ARCHETYPES - Specific
    // =========================================================================

    KIDS_NATURE: {
        strong: {
            openers: [
                "Duyên phận với con cái của bạn thuộc dạng **THUẬN LỢI**.",
                "Lá số cho thấy cung Con Cái vượng khí, dễ có và dễ nuôi.",
                "Mối quan hệ cha mẹ - con cái của bạn có nền tảng tốt đẹp."
            ],
            core: [
                "Cung Tử Tức không bị xung khắc, con cái ngoan ngoãn và biết vâng lời.",
                "Bạn có phúc về con, chúng sẽ mang lại niềm vui và sự tự hào.",
                "Con cái có khả năng thành đạt và hiếu thảo với cha mẹ."
            ],
            advice: [
                "Đầu tư thời gian chất lượng cho con để củng cố mối quan hệ.",
                "Định hướng đúng đắn cho con từ nhỏ để phát huy tiềm năng."
            ]
        },
        weak: {
            openers: [
                "Duyên phận với con cái của bạn cần **SỰ KIÊN NHẪN** và nỗ lực.",
                "Lá số cho thấy cung Con Cái cần được vun đắp cẩn thận.",
                "Mối quan hệ cha mẹ - con cái sẽ cần sự thấu hiểu và bao dung."
            ],
            core: [
                "Cung Tử Tức có một số thử thách, con cái có thể có tính cách độc lập mạnh.",
                "Cần nỗ lực nhiều hơn trong việc giao tiếp và hiểu con.",
                "Con cái có thể khác biệt quan điểm, cần tôn trọng sự khác biệt."
            ],
            advice: [
                "Lắng nghe và thấu hiểu thay vì áp đặt quan điểm lên con.",
                "Kiên nhẫn và bao dung là chìa khóa xây dựng mối quan hệ bền vững."
            ]
        }
    },

    KIDS_QUANTITY: {
        many: {
            openers: ["Lá số báo hiệu bạn có **SỐ ĐẾN TỪ 2-3 CON** hoặc hơn."],
            core: ["Cung Tử Tức vượng, khí sinh sản mạnh, dễ có nhiều con."],
            advice: ["Chuẩn bị tài chính và tâm lý sẵn sàng cho gia đình đông con."]
        },
        few: {
            openers: ["Lá số báo hiệu số con của bạn có thể **TỪ 1-2**."],
            core: ["Cung Tử Tức ở mức vừa phải, số con không nhiều nhưng chất lượng."],
            advice: ["Tập trung đầu tư cho số ít con để chúng phát triển tốt nhất."]
        }
    }
};

module.exports = { EXTENDED_ATOMS };
