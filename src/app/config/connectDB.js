import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error("MONGODB_URL is not defined. Please check your .env file.");
    throw new Error("Please define mongoDB Url in env file");
}


let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function ConnectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolsize: 10
        }
        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
}