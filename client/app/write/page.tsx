import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (!session) {
    return <div>로그인해야합니다.</div>;
  }
  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input type="text" name="title" placeholder="제목" />
        <input type="text" name="content" placeholder="내용" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
