import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
import SEO from '../../components/common/SEO';

const ArticlePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    const fetchArticle = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles/${slug}`);
            const data = await res.json();
            if (data.success) {
                setArticle(data.article);
                setRelatedArticles(data.related || []);
            } else {
                setError('Không tìm thấy bài viết');
            }
        } catch (err) {
            console.error('Failed to fetch article:', err);
            setError('Không thể tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateISO = (dateStr) => {
        return new Date(dateStr).toISOString();
    };

    // Generate Article structured data for SEO
    const getStructuredData = () => {
        if (!article) return null;
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt || article.title,
            "author": {
                "@type": "Person",
                "name": article.author || "Huyền Cơ Bát Tự"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Huyền Cơ Bát Tự",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://huyencobattu.com/logo.png"
                }
            },
            "datePublished": formatDateISO(article.created_at),
            "dateModified": formatDateISO(article.updated_at || article.created_at),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://huyencobattu.com/bai-viet/${article.slug}`
            },
            "image": article.thumbnail || "https://huyencobattu.com/og-image-default.jpg"
        };
    };

    if (loading) {
        return (
            <div className="article-page">
                <SEO title="Đang tải..." />
                <div className="article-loading">Đang tải bài viết...</div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="article-page">
                <SEO title="Không tìm thấy bài viết" />
                <div className="article-error">
                    <h2>😔 {error || 'Không tìm thấy bài viết'}</h2>
                    <button className="premium-button" onClick={() => navigate('/')}>
                        ← Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="article-page">
            {/* SEO Meta Tags */}
            <SEO
                title={article.title}
                description={article.excerpt || `${article.title} - Kiến thức Bát Tự chuyên sâu`}
                keywords={`bát tự, ${article.category_name || 'tử vi'}, ${article.title.toLowerCase()}`}
                type="article"
                url={`/bai-viet/${article.slug}`}
                canonical={`https://huyencobattu.com/bai-viet/${article.slug}`}
                image={article.thumbnail}
                structuredData={getStructuredData()}
            />

            <div className="article-container">
                <div className="article-breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span> / </span>
                    <span>Bài viết</span>
                    {article.category_name && (
                        <>
                            <span> / </span>
                            <span>{article.category_name}</span>
                        </>
                    )}
                </div>

                <article className="article-detail">
                    <header className="article-detail-header">
                        {article.category_name && (
                            <span className="article-detail-category">{article.category_name}</span>
                        )}
                        <h1 className="article-detail-title">{article.title}</h1>
                        <div className="article-detail-meta">
                            <span className="meta-author">✍️ {article.author}</span>
                            <span className="meta-date">📅 {formatDate(article.created_at)}</span>
                            <span className="meta-views">👁 {article.views} lượt xem</span>
                        </div>
                    </header>

                    {article.thumbnail && (
                        <div className="article-detail-image">
                            <img src={article.thumbnail} alt={article.title} />
                        </div>
                    )}

                    <div
                        className="article-detail-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {relatedArticles.length > 0 && (
                    <aside className="article-related">
                        <h3 className="related-title">📚 Bài viết liên quan</h3>
                        <div className="related-grid">
                            {relatedArticles.map(item => (
                                <div
                                    key={item.id}
                                    className="related-item"
                                    onClick={() => navigate(`/bai-viet/${item.slug}`)}
                                >
                                    <div className="related-item-image">
                                        {item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.title} />
                                        ) : (
                                            <div className="related-placeholder">📜</div>
                                        )}
                                    </div>
                                    <h4 className="related-item-title">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </aside>
                )}

                <div className="article-back">
                    <button className="premium-button" onClick={() => navigate('/')}>
                        ← Quay lại trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
