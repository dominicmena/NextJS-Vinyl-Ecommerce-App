import mongoose from "mongoose";

const connection = {}

async function connect() {
if (connection.isConnected) {
    console.log('already connected');
    return;
}
if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
        console.log('use previous connection')
        return
    }
    await mongoose.disconnect()
}
 const db = await mongoose.connect(process.env.MONGODB_URI)
 console.log('new connection')
 connection.isConnected = db.connections[0].readyState
};

async function disconnect() {

    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
            
        } else {
            console.log('not disconnected')
        }
    }
}

function convertDocToObj(doc) { ///
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()
    return doc
}

const db = {connect, disconnect, convertDocToObj}
export default db;

// This code defines a module to connect and disconnect to a MongoDB database using Mongoose. It also exports a function to convert a MongoDB document object into a regular object. The module creates a connection object that is used to store the state of the database connection. The connect function connects to the database if not already connected, and disconnect function disconnects from the database if connected. The convertDocToObj function takes a MongoDB document object and converts it into a regular object by converting some of its properties into strings. Finally, the module exports an object that contains the connect, disconnect, and convertDocToObj functions.