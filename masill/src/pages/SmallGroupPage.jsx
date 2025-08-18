import { useState } from "react";
import SmallGroup from "../components/board/SmallGroup";

export default function SmallGroupPage() {
  const [activeTab, setActiveTab] = useState("내용"); // Tab 상태 부모에서 관리

  return (
    <SmallGroup style={{ position: "relative" }}>
      <div id="modal-root" style={{ position: "absolute", inset: 0 }}></div>
      <div style={{ position: "relative" }}>
        <SmallGroup.High>
          <SmallGroup.ShowImage />
        </SmallGroup.High>
        <SmallGroup.Low>
          <SmallGroup.LowHead />
          <SmallGroup.LowBody>
            <SmallGroup.BodyTop />
            <SmallGroup.BodyMiddle>
              <SmallGroup.MiddleWho />
              <SmallGroup.TabMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </SmallGroup.BodyMiddle>

            <SmallGroup.LowCopoments style={{ position: "relative" }}>
              {activeTab === "내용" && <SmallGroup.DetailContent />}

              {activeTab === "댓글" && <SmallGroup.UserChat />}
            </SmallGroup.LowCopoments>
          </SmallGroup.LowBody>
        </SmallGroup.Low>
      </div>
    </SmallGroup>
  );
}
