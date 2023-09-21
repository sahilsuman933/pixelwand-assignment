import dotenv from 'dotenv';

dotenv.config();

export const { MONGODB_URI, JWT_SECRET, PORT } = process.env;
