import mongoose from 'mongoose';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const MongoConnect = () => {
    if (mongoose.connections[0].readyState) {
        console.log('already connected');
        return;
    }
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(console.log('connected'))
        .catch((e) => console.log('error', e));
};

export default MongoConnect;
