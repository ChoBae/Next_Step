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
    <div className={props.className}>
      <Link href={`/detail/${props.id}`}>
        <h4>{props.title}</h4>
      </Link>
      <p>{props.content}</p>
      <Link href={`/edit/${props.id}`}>✏️ 글 수정</Link>
    </div>
  );
};
export default CardItem;
