
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

let connection = false;

    const connect = () => {
        if (connection) {
            return;
        } else {
            const dbConnection = mongoose.connect(process.env.MONGO_URL);

        mongoose.connection.on('connected', () => {
            console.log("Mongodb connected successfully");
            connection = true;
        });

        mongoose.connection.on('error', (err) => {  // <-- Add 'err' parameter here
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("Mongodb is disconnected");
            connection = false;
        });
    }
};

export default connect;
