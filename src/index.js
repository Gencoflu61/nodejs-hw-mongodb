import { initMongoConnection } from "./db/initMongoConnection.js";
import setupServer from "./server.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    
    await initMongoConnection();
    console.log('MongoDB connection established!');

    
    const app = setupServer();
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(` Port ${PORT} is already in use. Please:`);
        console.error(`   1. Stop the process using port ${PORT}`);
        console.error(`   2. Or set a different PORT in your .env file`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();