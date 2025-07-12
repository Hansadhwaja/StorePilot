import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {
  if (globalForMongoose.mongooseCache!.conn) {
    return globalForMongoose.mongooseCache!.conn;
  }

  if (!globalForMongoose.mongooseCache!.promise) {
    globalForMongoose.mongooseCache!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('🟢 Connected to MongoDB');
      return mongoose;
    });
  }

  globalForMongoose.mongooseCache!.conn = await globalForMongoose.mongooseCache!.promise;
  return globalForMongoose.mongooseCache!.conn;
}

export default connectToDatabase;
