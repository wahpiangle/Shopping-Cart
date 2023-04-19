const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoClient = new MongoClient(process.env.URI);

const clientPromise = mongoClient.connect();

const handler = async(event) => {
    try{
        const database = (await clientPromise).db(process.env.DATABASE);
        const collection = database.collection(process.env.COLLECTION);
        const results = await collection.find({}).limit(10).toArray();
        return{
            statusCode: 200,
            body: JSON.stringify(results),
        }
    }catch(error){
        return {statusCode: 500, body: error.toString()}
    }
}

module.exports= {handler};