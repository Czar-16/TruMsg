import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// databse (connection status check)
// 0 → disconnected
// 1 → connected
// 2 → connecting
console.log(process.env.MONGODB_URI);

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  //Already Connected

  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || " ", {});

    console.log(db);
    console.log("######################################");
    console.log(db.connections);
    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;

