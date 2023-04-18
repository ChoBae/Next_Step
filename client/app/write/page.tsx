export default async function Write() {

  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input type="text" name="title" placeholder="제목" />
        <input type="text" name="content" placeholder="내용" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
