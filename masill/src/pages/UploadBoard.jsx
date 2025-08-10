import WriteBoard from "../components/board/WriteBoard";

export default function UploadBoard() {
  return (
    <WriteBoard>
      <WriteBoard.Container>
        <WriteBoard.UploadImg />
        <WriteBoard.SetTitle />
        <WriteBoard.SetLocation />
        <WriteBoard.SelectDate />
        <WriteBoard.SelectDate />

        <WriteBoard.WriteContext />
      </WriteBoard.Container>
    </WriteBoard>
  );
}
