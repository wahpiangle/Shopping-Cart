import { connect } from "./connect.js";

export default async function handler(req, res) {
    try {
        const { mongoClient } = await connect();
        const database = mongoClient.db(process.env.DATABASE);
        const collection = database.collection(process.env.COLLECTION);
        const results = await collection.find({}).toArray();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}