import Image from "next/image";
import styles from "./page.module.css";
import { clientPromise } from "../util/database";
export default async function Home() {
  let client = await clientPromise;
  let db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div>
      <h1>hi</h1>
      <h1>{result[0].title}</h1>
    </div>
  );
}
