import CardItem from "./CardItem";
import { ObjectId, Document, WithId } from "mongodb";
interface ListItemProps extends Document {
  result: WithId<Document>[];
}

const ListItem = (props: ListItemProps) => {
  return (
    <div>
      {props.result.map((item, index) => (
        <CardItem
          key={index}
          className="list-item"
          title={item.title}
          content={item.content}
          author={item.author}
          id={item._id.toString()}
        ></CardItem>
      ))}
    </div>
  );
};
export default ListItem;
