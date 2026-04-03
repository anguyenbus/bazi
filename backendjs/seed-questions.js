/**
 * Database Seed Script
 * Imports all 800 questions from data.js into SQLite database
 * Run: node seed-questions.js
 */

const { THEMES, QUESTIONS } = require('./src/bazi/questions/data');
const dbService = require('./src/services/database.service');

async function seedDatabase() {
    console.log('🌱 Starting database seeding...');

    // Initialize database
    await dbService.init();

    // Check if already seeded
    const existingCategories = dbService.getAllCategories();
    if (existingCategories.length > 0) {
        console.log('⚠️ Database already has categories. Skipping seed to avoid duplicates.');
        console.log(`   Found ${existingCategories.length} categories`);
        console.log('   To reseed, delete the bazi_consultant.db file first.');
        dbService.close();
        return;
    }

    let totalQuestions = 0;

    // Import each theme as a category
    for (let i = 0; i < THEMES.length; i++) {
        const theme = THEMES[i];
        console.log(`\n📁 Creating category: ${theme.icon} ${theme.name}`);

        // Create category
        const categoryId = dbService.createCategory({
            name: theme.name,
            icon: theme.icon,
            order_index: i
        });

        // Get questions for this theme
        const questions = QUESTIONS[theme.id] || [];
        console.log(`   → Importing ${questions.length} questions...`);

        // Import each question
        for (let j = 0; j < questions.length; j++) {
            const q = questions[j];
            dbService.db.run(`
                INSERT INTO custom_questions (category_id, text, order_index, is_active)
                VALUES (${categoryId}, '${q.text.replace(/'/g, "''")}', ${j}, 1)
            `);
            totalQuestions++;
        }

        dbService.save();
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   📊 Categories: ${THEMES.length}`);
    console.log(`   ❓ Questions: ${totalQuestions}`);

    dbService.close();
}

seedDatabase().catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
