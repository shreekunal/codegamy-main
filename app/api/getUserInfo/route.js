import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"
import { UserInfo } from "@/models/UserInfo.js";
import { User } from "@/models/User";

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (session?.user?._id) {
      const user = await User.findById(session?.user?._id)
      const data = await UserInfo.findById(user.userInfo)
      return new Response(JSON.stringify(data), { status: 200 })
    }
    else return new Response("User not logged in")
  } catch (error) {
    // Handle JWT decryption errors gracefully
    if (error.name === 'JWEDecryptionFailed') {
      return new Response("Session expired, please login again", { status: 401 })
    }
    console.error('getUserInfo error:', error);
    return new Response("Internal server error", { status: 500 })
  }
}