import { Db, MongoClient } from "mongodb";

import { libraryDbName, mongoClientOption, mongoUri } from "../config";

export const connectToDB = ():Db=>{
    const mongoClient = new MongoClient(mongoUri, mongoClientOption);
    return mongoClient.db(libraryDbName)
}
