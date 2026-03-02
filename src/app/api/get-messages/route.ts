import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request:Request) {
  await dbConnect();
  const session  = await getServerSession(authOptions)
  const user: User = session?.user as User


  if(!session ||!session.user){
    return Response.json({
      success: false,
      messgae : "Not Authenticated"
    },{status: 401})
  }
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user=await UserModel.aggregate([
      {$match: {id: userId} },
      {$unwind: '$messages'},
      {$sort: {'message.createdAt': -1} },
      {$group: {_id: '$_id', messages: {$push: '$messages'}}}
    ])
    if(!user || user.length===0){
      return Response.json(
        {
          success: false,
          messgae: "User not found",
        },
        { status: 401 },
      );
    }
    return Response.json(
      {
        success: true,
        messgaes: user[0].messgaes
      },
      { status: 200 },
    );
     
  } catch (error) {
    console.log("An unexpected error eccured: ", error)
    return Response.json(
      {
        success: false,
        messgae: "Not Authenticated",
      },
      { status: 500 },
    );
    
  }
  
}