import { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const db = (await clientPromise).db("forum");
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(req.body.id) });
    if (result.deletedCount === 1)
      return res.status(200).redirect(302, "/list");
    else return res.status(500).json({ message: "Something went wrong" });
  }
}
