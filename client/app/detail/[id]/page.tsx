import { ObjectId } from "mongodb";
import { clientDB } from "@/util/database";
import Comment from "../Commnet";
interface DetailProps {
  params: {
    id: string;
  };
}

export default async function Detail(props: DetailProps) {
  let client = await clientDB;
  let db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h1>상세 페이지</h1>
      <h1>{result?.title}</h1>
      <h1>{result?.content}</h1>
      <Comment postID={props.params.id}></Comment>
    </div>
  );
}
