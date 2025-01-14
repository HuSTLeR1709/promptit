import mongoose from 'mongoose'

let isConnected =false;

export const connectDatabase = async ()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("MongoDB is already connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "prompt_it",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
    } catch (error) {
        console.log(error)
        
    }
}