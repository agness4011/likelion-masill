import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import DatePicker from "react-mobile-datepicker";
// import "react-mobile-datepicker/dist/react-mobile-datepicker.css"; // 존재할 경우만

export default function WriteBoard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || "기본값";

  const handleNext = () => {
    navigate(`/main/${category}`);
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>{`<`}</button>
        <h1>이벤트 작성</h1>
      </div>
      <div>
        <div>{/* 이미지 업로드 */}</div>
        {children}
      </div>
      <div>
        <button onClick={handleNext}>공유</button>
      </div>
    </div>
  );
}

function Container({ children }) {
  return <div>{children}</div>;
}

function UploadImg() {
  return <div>이미지 업로드 구현 예정</div>;
}

function SetTitle() {
  return (
    <div>
      <p>제목</p>
      <input type="text" placeholder="이벤트 제목 입력" />
    </div>
  );
}

function SetLocation() {
  return (
    <div>
      <p>장소</p>
      <input type="text" placeholder="장소 입력" />
    </div>
  );
}

function SelectDate() {
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newVal) => {
    setValue(newVal);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>{value.toLocaleString()}</button>

      <DatePicker
        show={isOpen}
        value={value}
        dateConfig={{
          year: { format: "YYYY", caption: "년", step: 1 },
          month: { format: "MM", caption: "월", step: 1 },
          date: { format: "DD", caption: "일", step: 1 },
          hour: { format: "hh", caption: "시", step: 1 },
          minute: { format: "mm", caption: "분", step: 1 },
        }}
        onSelect={handleChange}
        onCancel={() => setIsOpen(false)}
        theme="ios"
      />
    </div>
  );
}

function WriteContext() {
  return (
    <div>
      <p>내용</p>
      <input type="text" placeholder="내용 입력" />
    </div>
  );
}

WriteBoard.Container = Container;
WriteBoard.UploadImg = UploadImg;
WriteBoard.SetTitle = SetTitle;
WriteBoard.SetLocation = SetLocation;
WriteBoard.SelectDate = SelectDate;
WriteBoard.WriteContext = WriteContext;
