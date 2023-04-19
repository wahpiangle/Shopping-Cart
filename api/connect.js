import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.URI;
let mongoClient;

export async function connect(){
    try{
        if(mongoClient){
            return{ mongoClient }
        }
        mongoClient = await(new MongoClient(url)).connect();
        console.log("Connected to MongoDB");
        return {mongoClient};
    }catch(error){
        console.error(error)
    }
}
