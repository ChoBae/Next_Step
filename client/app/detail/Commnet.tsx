"use client";

import { useEffect, useState, useRef } from "react";

interface CommentProps {
  postID: string;
}

export default function Comment(props: CommentProps) {
  // const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]); // [
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    fetch(`/api/comment/${props.postID}`)
      .then((res) => {
        console.log(res);
        if (!res.ok)
          throw Error("댓글 목록을 가져오는 중 오류가 발생했습니다.");
        return res.json();
      })
      .then((data) => {
        setCommentList(data);
      })
      .catch((error) => {
        console.error(error);
        alert("댓글 목록을 가져오는 중 오류가 발생했습니다.");
      });
  }, []);

  const commentSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");

    fetch(`/api/comment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: props.postID,
        comment: comment,
      }),
    })
      .then((res) => {
        if (!res.ok) throw Error("댓글 등록 중 오류가 발생했습니다.");
        return res.json();
      })
      .then(() => {
        return fetch(`/api/comment/${props.postID}`);
      })
      .then((res) => {
        if (!res.ok)
          throw Error("댓글 목록을 가져오는 중 오류가 발생했습니다.");
        return res.json();
      })
      .then((data) => {
        setCommentList(data);
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("댓글 등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <div>댓글목록</div>
      {commentList.map((comment: any) => {
        return (
          <div key={comment._id}>
            <p>{comment.comment}</p>
            <p>{comment.author}</p>
          </div>
        );
      })}
      <form onSubmit={commentSumbitHandler} ref={formRef}>
        <input type="text" name="comment" />
        <button>댓글전송</button>
      </form>
    </div>
  );
}
