import WriteBoard from "../components/board/WriteBoard";
export default function BoardPage() {
  return (
    <WriteBoard>
      <WriteBoard.Head />
      <WriteBoard.Form>
        <WriteBoard.InputForm />
      </WriteBoard.Form>
    </WriteBoard>
  );
}
