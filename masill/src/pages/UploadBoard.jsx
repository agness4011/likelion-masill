import WriteBoard from "../components/board/WriteBoard";

export default function UploadBoard() {
  return (
    <WriteBoard>
      <WriteBoard.Head />
      <WriteBoard.Form>
        <WriteBoard.InputForm />
      </WriteBoard.Form>
    </WriteBoard>
  );
}
