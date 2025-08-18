import DetailBoard from "../components/board/DetailBoard";
import { useState } from "react";

export default function DetailBoardPage() {
  const [activeTab, setActiveTab] = useState("내용"); // Tab 상태 부모에서 관리

  return (
    <DetailBoard style={{ position: "relative" }}>
      <div id="modal-root" style={{ position: "absolute", inset: 0 }}></div>
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
              <DetailBoard.TabMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </DetailBoard.BodyMiddle>

            <DetailBoard.LowCopoments style={{ position: "relative" }}>
              {activeTab === "내용" && <DetailBoard.DetailContent />}

              {activeTab === "댓글" && <DetailBoard.UserChat />}

              {activeTab === "마실 모임" && <DetailBoard.Group />}
            </DetailBoard.LowCopoments>
          </DetailBoard.LowBody>
        </DetailBoard.Low>
      </div>
    </DetailBoard>
  );
}
