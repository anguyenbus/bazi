import React, { useState } from 'react';
import { exportToImage } from '../services/imageExport';

const ImageExportButton = ({ data }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!data) return;
        setIsExporting(true);
        try {
            await exportToImage(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            className="chart-action-btn"
            onClick={handleExport}
            disabled={isExporting}
            style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}
            title="Xuất lá số dạng ảnh"
        >
            {isExporting ? '...' : '📷 Xuất lá số'}
        </button>
    );
};

export default ImageExportButton;
