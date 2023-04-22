"use client";

interface CommentProps {
  postID: string;
}

export default function Comment(props: CommentProps) {
  // const [comment, setComment] = useState("");

  const commentSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");

    // console.log(comment);
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
        console.log(res);
        if (!res.ok) throw Error("댓글 등록 중 오류가 발생했습니다.");
        return res.json();
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
        alert("댓글 등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <div>댓글목록</div>
      <form onSubmit={commentSumbitHandler}>
        <input type="text" name="comment" />
        <button>댓글전송</button>
      </form>
    </div>
  );
}
