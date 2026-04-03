import React, { useState } from 'react';
import { exportToPDF } from '../services/pdfExport';

const PDFExportButton = ({ data }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!data) {
            alert('Chưa có dữ liệu để xuất PDF!');
            return;
        }

        setIsExporting(true);
        try {
            // Full export includes everything visible on the chart page
            const exportOptions = {
                includeChart: true,
                includeAnalysis: true,
                includeInterpretation: true,
                includeLuanTinh: true, // Specific flag for new section
                includeLuanDong: true  // Specific flag for new section
            };
            await exportToPDF(data, exportOptions);
        } catch (error) {
            console.error('PDF Export Error:', error);
            alert('Có lỗi xảy ra khi xuất PDF!');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="pdf-export-wrapper">
            <button
                className="chart-action-btn"
                onClick={handleExport}
                disabled={isExporting}
            >
                {isExporting ? (
                    <>
                        <span className="loading-spinner"></span>
                        Đang xuất...
                    </>
                ) : (
                    <>📄 Xuất PDF</>
                )}
            </button>
        </div>

    );
};

export default PDFExportButton;
