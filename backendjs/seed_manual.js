const db = require('./src/services/database.service');
const seedArticles = require('./src/utils/seed-articles');

async function seed() {
    console.log('Starting manual seed...');
    try {
        await db.init();
        console.log('Database initialized.');

        // Initialize categories first
        await db.initDefaultArticleCategories();

        // Get category IDs
        const categories = await db.getArticleCategories();
        const catMap = {};
        categories.forEach(c => { catMap[c.slug] = c.id; });
        console.log('Categories loaded:', Object.keys(catMap));

        // Delete existing articles ? Optional, but maybe safer to avoid duplicates if slug constraint exists.
        // The service checks for slug existence on create, but here we might want to force clean slate or upsert.
        // Let's just try to create and catch errors if they exist, OR simpler: delete all first.
        // To be safe and ensure "Knowledge" section appears, let's clean articles table first.

        await db.run('DELETE FROM articles');
        console.log('Cleared existing articles.');

        let count = 0;
        for (const article of seedArticles) {
            try {
                await db.createArticle({
                    ...article,
                    category_id: catMap[article.category_slug] || catMap['khai-niem']
                });
                count++;
                process.stdout.write('.');
            } catch (err) {
                console.error(`\nFailed to seed article "${article.title}":`, err.message);
            }
        }
        console.log(`\nSeeding complete. Inserted ${count} articles.`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
