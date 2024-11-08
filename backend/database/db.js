// import { connect } from 'mongoose';

// const connectToMongo = async () => {
//     try {
//         await connect('mongodb://localhost:27017/', {
//             dbName: "paymentGateway",
//         });
//         console.log("Connected to MongoDB successfully!");
//     } catch (error) {
//         console.log("MongoDB connection failed:", error);
//     }
// }

// export default connectToMongo;

import { connect } from 'mongoose';

const connectToMongo = async () => {
    try {
        await connect('mongodb://localhost:27017/', {
            dbName: "paymentGateway",
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
    }
};

export default connectToMongo;

