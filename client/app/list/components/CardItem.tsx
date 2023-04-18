import { ObjectId } from "mongodb";
import Link from "next/link";
interface CardItemProps {
  id: string;
  className: string;
  title: string;
  content: string;
}

const CardItem = (props: CardItemProps) => {
  return (
    <Link href={`/detail/${props.id}`}>
      <div className={props.className}>
        <h4>{props.title}</h4>
        <p>{props.content}</p>
      </div>
    </Link>
  );
};
export default CardItem;
