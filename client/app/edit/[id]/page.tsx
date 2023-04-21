import { ObjectId } from "mongodb";
import { clientDB } from "@/util/database";

interface EditProps {
  params: {
    id: string;
  };
}

export default async function Edit(props: EditProps) {
  let client = await clientDB;
  let db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div className="p-20">
      <h4>글 수정</h4>
      <form action="/api/post/edit" method="POST">
        <input type="hidden" name="id" defaultValue={props.params.id} />
        <input type="text" name="title" defaultValue={result?.title} />
        <input type="text" name="content" defaultValue={result?.content} />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
