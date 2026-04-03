import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api';

const ArticlesSection = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        fetchArticles();
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [activeCategory, page]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles/categories`);
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories || []);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                category: activeCategory,
                page: page.toString(),
                limit: '5'
            });
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles?${params}`);
            const data = await res.json();
            if (data.success) {
                setArticles(data.articles || []);
                setTotalPages(data.pagination?.totalPages || 1);
            }
        } catch (err) {
            console.error('Failed to fetch articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleArticleClick = (slug) => {
        navigate(`/bai-viet/${slug}`);
    };

    const handleCategoryChange = (slug) => {
        setActiveCategory(slug);
        setPage(1);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    if (loading && articles.length === 0) {
        return (
            <div className="articles-section glass-card">
                <div className="articles-loading">Đang tải bài viết...</div>
            </div>
        );
    }

    const featuredArticle = articles[0];
    const sidebarArticles = articles.slice(1, 5);

    return (
        <div className="articles-section glass-card">
            <div className="articles-header">
                <h2 className="articles-title">
                    <span className="title-highlight">KIẾN THỨC BÁT TỰ</span>
                </h2>
                <div className="articles-categories">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-tab ${activeCategory === cat.slug ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.slug)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="articles-content">
                {/* Main Featured Article */}
                {featuredArticle && (
                    <div className="article-main" onClick={() => handleArticleClick(featuredArticle.slug)}>
                        <div className="article-main-image">
                            {featuredArticle.thumbnail ? (
                                <img src={featuredArticle.thumbnail} alt={featuredArticle.title} />
                            ) : (
                                <div className="article-placeholder-image">
                                    <span>🔮</span>
                                </div>
                            )}
                            {featuredArticle.category_name && (
                                <span className="article-category-badge">{featuredArticle.category_name}</span>
                            )}
                        </div>
                        <div className="article-main-body">
                            <h3 className="article-main-title">{featuredArticle.title}</h3>
                            <div className="article-meta">
                                <span className="article-author">{featuredArticle.author}</span>
                                <span className="article-date">{formatDate(featuredArticle.created_at)}</span>
                                <span className="article-views">👁 {featuredArticle.views || 0}</span>
                            </div>
                            <p className="article-excerpt">{featuredArticle.excerpt}</p>
                        </div>
                    </div>
                )}

                {/* Sidebar Articles */}
                <div className="articles-sidebar">
                    {sidebarArticles.map(article => (
                        <div
                            key={article.id}
                            className="article-sidebar-item"
                            onClick={() => handleArticleClick(article.slug)}
                        >
                            <div className="article-sidebar-image">
                                {article.thumbnail ? (
                                    <img src={article.thumbnail} alt={article.title} />
                                ) : (
                                    <div className="article-placeholder-small">📜</div>
                                )}
                            </div>
                            <div className="article-sidebar-body">
                                <h4 className="article-sidebar-title">{article.title}</h4>
                                <span className="article-sidebar-date">{formatDate(article.created_at)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="articles-pagination">
                <button
                    className="pagination-btn"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    ← Trước
                </button>
                <span className="pagination-info">Trang {page} / {totalPages}</span>
                <button
                    className="pagination-btn"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                >
                    Sau →
                </button>
            </div>
        </div>
    );
};

export default ArticlesSection;
