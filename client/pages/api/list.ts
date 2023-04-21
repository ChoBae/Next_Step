import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "../../util/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const db = (await clientDB).db("forum");
    const result = await db.collection("post").find().toArray();
    return res.status(200).json(result);
  }
}
