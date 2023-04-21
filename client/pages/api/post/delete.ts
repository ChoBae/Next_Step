import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: "Unauthorized" });
  else {
    if (req.method === "DELETE") {
      const db = (await clientDB).db("forum");
      const result = await db.collection("post").deleteOne({
        _id: new ObjectId(req.body.id),
        author: session.user?.email,
      });
      if (result.deletedCount === 1)
        return res.status(200).redirect(302, "/list");
      else return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
