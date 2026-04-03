/**
 * Địch Thiên Tủy Data
 */

const STEM_ESSENCE = {
    '甲': {
        'verse': "Giáp mộc sâm thiên, thoát thai yếu hỏa. Xuân bất dung kim, thu bất dung thổ. Hỏa xí thừa long, thủy đãng kị hổ.",
        'detail': "Giáp Mộc là cây đại thụ. Mùa Xuân vượng (Dần Mão) cần Hỏa để tiết tú, mùa Thu suy (Thân Dậu) cần Ấn hóa Sát. Gặp Hỏa mạnh cần có Thìn (Long) để giữ ẩm, gặp Thủy mạnh cần có Dần (Hổ) để nạp thủy.",
        'seasonal': {
            'Spring': "Mộc vượng cực điểm, hỷ Hỏa (Bính) phát huy tài năng, kỵ Kim (Canh) khắc phá làm tổn thương sinh khí.",
            'Summer': "Mộc bị tiết khí nặng, hỷ Thủy (Quý) nhuận trạch để giữ sức sống, kỵ Hỏa vượng làm cây khô cháy.",
            'Autumn': "Mộc điêu linh, hỷ Thổ sinh Kim hóa Ấn (Nhâm), kỵ Sát (Canh) quá vượng mà không có Thủy thông quan.",
            'Winter': "Mộc hàn lạnh, hỷ Hỏa (Bính) sưởi ấm để sinh trưởng, kỵ Thủy vượng làm mục rễ và đất đóng băng."
        }
    },
    '乙': {
        'verse': "Ất mộc đằng lao, hệ nhiễu giáp mộc. Xuân như hồng nhạn, thu tự thiền quyên. Hoát cát can chi, phú quý thùy truyền.",
        'detail': "Ất Mộc là dây leo, mộc âm nhu. Xuân hỷ Hỏa, Thu hỷ Mộc (Giáp). Có Giáp Mộc bên cạnh là thế 'đằng la hệ Giáp', giúp Ất mộc bất chấp sương gió vẫn có thể vươn cao và bền vững.",
        'seasonal': {
            'Spring': "Hỷ hướng dương (Bính hỏa), kỵ Thủy thiều (ẩm ướt quá mức) làm rễ mục nát.",
            'Summer': "Hỷ Thủy nhuận (Quý thủy), kỵ táo nhiệt (Mậu Thổ, Bính hỏa) làm cỏ cây khô héo nhanh chóng.",
            'Autumn': "Hỷ Kim mộc tương phụ (Giáp mộc), kỵ Thổ dày vùi lấp ánh sáng và không gian phát triển.",
            'Winter': "Hỷ Hỏa ấm (Đinh hỏa), kỵ Thủy vượng làm chìm ngập cây cỏ trong giá rét."
        }
    },
    '丙': {
        'verse': "Bính hỏa mãnh liệt, khi sương đắc tuyết. Năng đoán canh kim, phùng tân phản khiếp. Thổ chúng thành từ, thủy chi tiết tiết.",
        'detail': "Bính Hỏa là Thái Dương. Mùa Đông không sợ lạnh (sương tuyết), có thể rèn được Canh Kim cứng rắn nhưng lại sợ Tân Kim (hợp hóa). Gặp Thổ dày làm mờ ánh sáng, gặp Thủy vượng làm tiết bớt uy phong.",
        'seasonal': {
            'Spring': "Hỷ Thủy mộc tương sinh (Nhâm thủy), kỵ Thổ dày làm mờ đi ánh hào quang rực rỡ.",
            'Summer': "Hỏa khí cực vượng, hỷ Thủy (Nhâm) chế ước để đạt thế 'Thủy hỏa tương tế', kỵ Hỏa vượng thêm gây khô cháy vạn vật.",
            'Autumn': "Hỷ Kim thủy (Tân Kim), kỵ Mộc đa làm hỏa mờ mịt không chiếu sáng được xa.",
            'Winter': "Hỏa thế yếu, hỷ Hỏa trợ (Đinh) và Thổ (Mậu) ngăn thủy, kỵ Thủy vượng dập tắt ánh dương."
        }
    },
    '丁': {
        'verse': "Đinh hỏa nhu trung, nội tính chiêu dung. Đắc hiếu từ mẫu, khả thu khả đông. Nhược hồng nhạn chi thu, tự thiền quyên chi hạ.",
        'detail': "Đinh Hỏa là ngọn lửa lò, ánh sao. Tuy âm nhu nhưng bên trong sáng sủa. Hỷ Giáp mộc (Mẫu thân) làm bấc đèn. Có Giáp thì dù mùa Thu hay mùa Đông đều có thể tỏa sáng rực rỡ.",
        'seasonal': {
            'Spring': "Hỷ Mộc sinh (Giáp), kỵ Thổ tiết khí làm lửa mờ yếu.",
            'Summer': "Hỷ Thủy nhuận (Nhâm), kỵ Kim vượng làm lửa nóng quá đại khó kiểm soát.",
            'Autumn': "Hỷ Giáp mộc (Tiêu giáp sinh hỏa), kỵ Kim đa làm lửa bị vùi lấp hoặc yếu ớt.",
            'Winter': "Hỷ Hỏa trợ (Bính), kỵ Thủy vượng dập tắt lửa đèn một cách đột ngột."
        }
    },
    '戊': {
        'verse': "Mậu thổ cố trọng, ký trung thả chính. Tĩnh hấp động tịch, vạn vật tư sinh. Thủy nhuận vật sinh, hỏa táo vật bệnh.",
        'detail': "Mậu Thổ là đất núi cao, đê đập. Bản tính kiên cố, trung chính. Hỷ Thủy nhuận để vạn vật sinh sôi, kỵ Hỏa táo làm đất nứt nẻ, hoang mạc hóa.",
        'seasonal': {
            'Spring': "Thổ bạc, hỷ Hỏa sinh (Bính) và Thổ trợ (Kỷ), kỵ Mộc khắc (Giáp) làm đất bị xói mòn.",
            'Summer': "Thổ táo, hỷ Thủy nhuận (Quý), kỵ Hỏa vượng (Bính) làm đất khô cháy không thể canh tác.",
            'Autumn': "Thổ hư, hỷ Kim thủy (Canh), kỵ Mộc vượng làm đất bị xới tung mất gốc.",
            'Winter': "Thổ hàn, hỷ Hỏa ấm (Bính), kỵ Thủy vượng làm đất bị lầy lội, đóng băng."
        }
    },
    '己': {
        'verse': "Kỷ thổ ti thấp, trung chính súc tàng. Bất sầu mộc thịnh, bất úy thủy cuồng. Hỏa thiếu hỏa linh, mộc đa mộc trù.",
        'detail': "Kỷ Thổ là đất vườn tược, âm thổ nhu nhuyễn. Không sợ Mộc vượng (vì đất mềm dễ thích nghi), không sợ Thủy cuồng (vì có khả năng nạp thủy). Hỷ Kim thủy để sinh tài, Hỏa để sưởi ấm.",
        'seasonal': {
            'Spring': "Hỷ Hỏa ấm (Bính), kỵ Mộc quá vượng làm xới tung đất vườn không kịp phục hồi.",
            'Summer': "Hỷ Thủy nhuận (Quý), kỵ Hỏa táo làm đất vườn khô cằn, cây cối héo úa.",
            'Autumn': "Hỷ Kim sinh tài (Tân), kỵ Thổ dày lấp mất tài khí của kim.",
            'Winter': "Hỷ Hỏa ấm (Bính), kỵ Thủy vượng làm đất lầy lội, rét mướt phá hỏng mùa màng."
        }
    },
    '庚': {
        'verse': "Canh kim đới sát, cương kiện vi tối. Đắc hỏa nhi duệ, đắc thủy nhi thanh. Thổ nhuận tắc sinh, thổ táo tắc thoái.",
        'detail': "Canh Kim là sắt cứng, đao kiếm. Hỷ Đinh hỏa rèn luyện thành vật hữu dụng, Nhâm thủy rửa sạch để sáng bóng. Thổ ẩm sinh kim, thổ khô làm kim bị xỉn màu.",
        'seasonal': {
            'Spring': "Kim yếu, hỷ Thổ sinh (Mậu) và Kim trợ (Tân), kỵ Hỏa khắc (Bính) làm tan chảy kim khí chưa định hình.",
            'Summer': "Kim táo, hỷ Thủy nhuận (Nhâm), kỵ Hỏa vượng (Đinh) làm chảy kim hoặc biến chất sắt thép.",
            'Autumn': "Kim vượng, hỷ Hỏa rèn (Đinh), kỵ Thủy vượng làm kim bị trầm dưới đáy nước.",
            'Winter': "Kim hàn, hỷ Hỏa ấm (Bính), kỵ Thủy vượng làm kim lạnh lẽo, giòn gãy."
        }
    },
    '辛': {
        'verse': "Tân kim châu ngọc, ôn nhuận nhi thanh. Sợ thổ chi đa, lạc thủy chi thịnh. Năng cứu xà nam, năng hối kiếm phong.",
        'detail': "Tân Kim là châu ngọc, vàng trang sức. Hỷ Nhâm thủy rửa sạch khí thế, kỵ Thổ dày vùi lấp (Mậu thổ). Có thể hóa giải được sự hung hãn của Hỏa khi cần thiết.",
        'seasonal': {
            'Spring': "Hỷ Thổ sinh (Kỷ), kỵ Hỏa khắc (Đinh) làm xỉn màu và mất đi giá trị của châu ngọc.",
            'Summer': "Hỷ Thủy nhuận (Nhâm), kỵ Hỏa táo (Bính) làm chảy ngọc hoặc nứt nẻ đồ trang sức.",
            'Autumn': "Hỷ Nhâm thủy (Tẩy trạch), kỵ Thổ dày (Mậu) vùi lấp mất ánh hào quang.",
            'Winter': "Hỷ Hỏa ấm (Bính), kỵ Thủy vượng làm lạnh ngọc, mất đi vẻ ôn nhuận."
        }
    },
    '壬': {
        'verse': "Nhâm thủy thông hà, năng tiết canh kim. Cương trung chi đức, chu lưu bất đình. Hỏa chi thủy tiết, thổ chi thủy bế.",
        'detail': "Nhâm Thủy là nước sông ngòi, đại dương. Bản tính cương liệt, chảy mãi không ngừng. Hỷ Mậu thổ làm đê đập để thành quý hiển, tiết được khí của Canh Kim.",
        'seasonal': {
            'Spring': "Thủy tiết vào Mộc, hỷ Kim sinh (Canh), kỵ Thổ khắc (Kỷ) làm đục dòng nước.",
            'Summer': "Thủy khô cạn, hỷ Kim thủy (Nhâm), kỵ Hỏa vượng (Bính) làm bốc hơi toàn bộ tài nguyên.",
            'Autumn': "Thủy vượng địa, hỷ Thổ chế (Mậu) để thành đê đập, kỵ Kim đa làm thủy lụt lội vỡ bờ.",
            'Winter': "Thủy hàn lạnh, hỷ Hỏa ấm (Bính), kỵ Thủy vượng dâng cao gây tai họa lũ lụt giá băng."
        }
    },
    '癸': {
        'verse': "Quý thủy chí nhu, đạt vu thiên tân. Đắc long nhi vận, công hóa tư thần. Bất ưu hỏa thổ, bất luận canh tân.",
        'detail': "Quý Thủy là sương mù, nước mưa nhỏ. Cực kỳ âm nhu, có thể thấu đến tận mây xanh. Hỷ Thìn (Long) để biến hóa khôn lường. Không sợ Hỏa Thổ nếu có sự điều hòa tốt.",
        'seasonal': {
            'Spring': "Hỷ Hỏa ấm (Bính), kỵ Thổ dày (Mậu) lấp mất sương mù, làm đất đai u ám.",
            'Summer': "Hỷ Kim mộc (Tân), kỵ Hỏa táo (Đinh) làm bốc hơi sạch khí lực.",
            'Autumn': "Hỷ Thổ mộc (Mậu), kỵ Thủy vượng (Nhâm) làm mưa dầm dề che khuất ánh sáng.",
            'Winter': "Hỷ Hỏa ấm (Bính), kỵ Thủy vượng làm giá băng, vạn vật tê liệt."
        }
    }
};

module.exports = {
    STEM_ESSENCE
};
