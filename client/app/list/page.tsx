import { clientPromise } from "@/util/database";
import CardItem from "./components/CardItem";
export default async function List() {
  let client = await clientPromise;
  let db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result);
  return (
    <div className="list-bg">
      {result.map((item, index) => {
        return (
          <CardItem
            key={index}
            className="list-item"
            title={item.title}
            content={item.content}
            id={item._id.toString()}
          ></CardItem>
        );
      })}
    </div>
  );
}
