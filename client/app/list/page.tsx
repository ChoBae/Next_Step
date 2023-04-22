import { clientDB } from "@/util/database";
import ListItem from "./components/ListItem";

export const dynamic = "force-dynamic"; 

export default async function List() {
  let client = await clientDB;
  let db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  // console.log(result);
  return (
    <div className="list-bg">
      <ListItem result={result}></ListItem>
    </div>
  );
}
