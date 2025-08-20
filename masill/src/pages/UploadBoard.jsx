import WriteBoard from "../components/board/WriteBoard";

export default function UploadBoard() {
  return (
    <div style={{ width: '393px', height: '852px', background: '#fff', overflowY: 'auto' }}>
      <WriteBoard.Head />
      <WriteBoard.Form>
        <WriteBoard.InputForm />
      </WriteBoard.Form>
    </div>
  );
}
