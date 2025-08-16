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
            <DetailBoard.BodyMiddle>
              <DetailBoard.MiddleWho />
              <DetailBoard.TabMenu />
            </DetailBoard.BodyMiddle>
            <DetailBoard.LowCopoments>
              <DetailBoard.DetailContent />
            </DetailBoard.LowCopoments>
          </DetailBoard.LowBody>
        </DetailBoard.Low>
      </div>
    </DetailBoard>
  );
}
