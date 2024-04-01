import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "./getDataFromToken";

connect();

export default async function GET() {
  try {
    const userId = await getDataFromToken();
    const user = await User.findOne({ _id: userId }).select("-password");

    return user.id;
  } catch (error: any) {
    return "0";
  }
}
