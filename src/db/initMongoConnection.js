import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config;  // Завантаження змінних оточення з файлу .env


// Отримання змінних оточення
const { MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_URL,
    MONGODB_DB } = process.env;


// Формування URL для підключення

const connection = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

export const initMongoConnection = async () => {

    try {
        await mongoose.connect(connection);
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Mongo connection failed:', error);
    }
};
