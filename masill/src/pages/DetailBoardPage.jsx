import DetailBoard from "../components/board/DetailBoard";

export default function DetailBoardPage() {
  return (
    <DetailBoard>
      <div style={{ position: "relative" }}>
        <DetailBoard.High>
          <DetailBoard.ShowImage />
        </DetailBoard.High>
        <DetailBoard.Low>
          <DetailBoard.LowHead />
          <DetailBoard.LowBody>
            <DetailBoard.BodyTop />
          </DetailBoard.LowBody>
        </DetailBoard.Low>
      </div>
    </DetailBoard>
  );
}
