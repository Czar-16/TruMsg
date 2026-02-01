import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
  
  content: string,
  createdAt: Date
}

// typescript string (small)
  // mongoose string (capital S)

  const MessageSchem: Schema<Message> = new Schema({

    content:{
      type: String,
      required: true
    },
    createdAt:{
      type: Date,
      required: true,
      default: Date.now
    }

  })