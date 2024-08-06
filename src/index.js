import { initMongoConnection } from "./db/initMongoConnection";
import { setupServer } from "./server";

// Підключення до MongoDB і запуск серверу
(async () => {
    try {
        await initMongoConnection();
        setupServer();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
})();
