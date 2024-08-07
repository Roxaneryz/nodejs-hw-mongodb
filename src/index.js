import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";

// Підключення до MongoDB і запуск серверу
(async () => {
    try {
        await initMongoConnection();
        setupServer();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
})();
