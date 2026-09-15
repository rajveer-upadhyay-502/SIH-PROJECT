import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI environment variable in .env.local');
}

// Global is used here to persist the connection across hot reloads in development
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set('strictQuery', true);

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        ...(MONGODB_DB ? { dbName: MONGODB_DB } : {}),
        serverSelectionTimeoutMS: 10000,
      })
      .then((connection) => connection)
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
