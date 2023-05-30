import mongoose, { ConnectOptions } from "mongoose";
import config from "./default";

const connectDB = async () => {
    try {
        // Use the MONGO_URI environment variable or the default value
        const uri = process.env.MONGO_URI || `mongodb://localhost:${config.port}/mydatabase`;

        // Define the connection options and cast them as ConnectOptions
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } as ConnectOptions;

        // Connect to MongoDB using mongoose
        const conn = await mongoose.connect(uri, options);

        // Log the connection status
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Handle any connection errors
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
