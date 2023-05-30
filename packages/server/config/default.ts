import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the default config object
export default {
	// Use the PORT environment variable or the default value
	port: process.env.PORT || 5002,

	// Use the HOST environment variable or the default value
	host: process.env.HOST || "localhost",

	// Use the CORS_ORIGIN environment variable or the default value
	corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
