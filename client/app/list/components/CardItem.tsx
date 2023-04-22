"use client";
import { ObjectId } from "mongodb";
import Link from "next/link";
interface CardItemProps {
  id: string;
  className: string;
  title: string;
  content: string;
  author: string;
}

const CardItem = (props: CardItemProps) => {
  return (
    <div className={props.className}>
      <Link href={`/detail/${props.id}`}>
        <h4>{props.title}</h4>
      </Link>
      <p>{props.content}</p>
      <p>{props.author}</p>
      <Link href={`/edit/${props.id}`}>✏️ 글 수정</Link>
      <span
        onClick={(e: any) => {
          fetch(`/api/post/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: props.id,
              author: props.author,
            }),
          })
            .then((res) => {
              console.log(res);
              if (!res.ok) throw Error("글 삭제 중 오류가 발생했습니다.");
              return res.json();
            })
            .then(() => {
              e.target.parentElement.style.opacity = "0";
              setTimeout(() => {
                e.target.parentElement.style.display = "none";
              }, 1000);
            })
            .catch((error) => {
              console.error(error);
              alert("글 삭제 중 오류가 발생했습니다.");
            });
        }}
      >
        🗑️ 글 삭제
      </span>
    </div>
  );
};
export default CardItem;
