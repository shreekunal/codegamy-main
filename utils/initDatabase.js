// Database Initialization Script
// This script initializes the MongoDB database with proper setup

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');

    // Connect directly using the environment variable
    const MONGODB_URI = process.env.MONGO_URL;
    if (!MONGODB_URI) {
      throw new Error('MONGO_URL environment variable is not set');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    const dbName = mongoose.connection.db.databaseName;
    console.log(`📊 Database: ${dbName}`);

    // Get database stats
    const stats = await mongoose.connection.db.stats();
    console.log('📈 Database Stats:', {
      collections: stats.collections,
      objects: stats.objects,
      dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
      storageSize: `${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`
    });

    // List existing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Collections:', collections.map(c => c.name));

    console.log('✅ Database initialization completed successfully!');
    console.log(`🎯 Database "${dbName}" is ready for use.`);

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  }
}

// Run initialization if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
}

export default initializeDatabase;
