// src/config/db.js
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
const DB_CONFIG = {
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/siem_dashboard',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  elasticsearch: {
    // Optional: For SIEM logs and search (if using ELK stack)
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    auth: {
      username: process.env.ES_USERNAME,
      password: process.env.ES_PASSWORD,
    },
  },
};

// MongoDB Connection
let mongoConnection = null;

const connectMongoDB = async () => {
  if (mongoConnection) {
    logger.info('MongoDB already connected');
    return mongoConnection;
  }

  try {
    logger.info('Connecting to MongoDB...');
    const conn = await mongoose.connect(DB_CONFIG.mongo.uri, DB_CONFIG.mongo.options);
    mongoConnection = conn.connection;
    
    mongoConnection.once('open', () => {
      logger.info('MongoDB connection opened successfully');
    });

    mongoConnection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoConnection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      mongoConnection = null;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('SIGINT received, closing MongoDB connection...');
      await mongoose.connection.close();
      process.exit(0);
    });

    return mongoConnection;
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    throw error;
  }
};

// Elasticsearch Connection (Optional for SIEM logs)
let elasticsearchClient = null;

const connectElasticsearch = async () => {
  if (!process.env.ELASTICSEARCH_URL) {
    logger.info('Elasticsearch URL not provided, skipping connection');
    return null;
  }

  try {
    const { Client } = await import('@elastic/elasticsearch');
    
    elasticsearchClient = new Client({
      node: DB_CONFIG.elasticsearch.node,
      auth: DB_CONFIG.elasticsearch.auth.username && DB_CONFIG.elasticsearch.auth.password
        ? DB_CONFIG.elasticsearch.auth
        : undefined,
      requestTimeout: 30000,
    });

    // Test connection
    await elasticsearchClient.ping();
    logger.info('Elasticsearch connection successful');
    
    return elasticsearchClient;
  } catch (error) {
    logger.error('Elasticsearch connection failed:', error);
    return null;
  }
};

// Database health check
const healthCheck = async () => {
  const results = {
    mongodb: false,
    elasticsearch: false,
  };

  try {
    await connectMongoDB();
    results.mongodb = true;
  } catch (error) {
    logger.error('MongoDB health check failed:', error);
  }

  try {
    await connectElasticsearch();
    results.elasticsearch = !!elasticsearchClient;
  } catch (error) {
    logger.error('Elasticsearch health check failed:', error);
  }

  return results;
};

// Export functions and clients
export { connectMongoDB, connectElasticsearch, healthCheck };
export { mongoConnection, elasticsearchClient };
export default DB_CONFIG;