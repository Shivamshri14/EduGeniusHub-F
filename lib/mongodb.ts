import mongoose from 'mongoose';

/**
 * Global cache for MongoDB Mongoose connection to prevent
 * connection leaks across Next.js API routes and serverless invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export async function checkMongoConnection(): Promise<{
  connected: boolean;
  status: string;
  error?: string;
  database?: string;
}> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return {
      connected: false,
      status: 'missing_uri',
      error: 'MONGODB_URI environment variable is not configured',
    };
  }

  try {
    const db = await connectToDatabase();
    const state = db.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      return {
        connected: true,
        status: 'connected',
        database: db.connection.db?.databaseName || 'Cluster0',
      };
    } else {
      return {
        connected: false,
        status: 'connecting_or_disconnected',
      };
    }
  } catch (err: any) {
    return {
      connected: false,
      status: 'error',
      error: err?.message || 'Failed to connect to MongoDB Atlas',
    };
  }
}
