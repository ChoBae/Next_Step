import { clientPromise } from "@/util/database";
import ListItem from "./components/ListItem";
export default async function List() {
  let client = await clientPromise;
  let db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  // console.log(result);
  return (
    <div className="list-bg">
      <ListItem result={result}></ListItem>
    </div>
  );
}
