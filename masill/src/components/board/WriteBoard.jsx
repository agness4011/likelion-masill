import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import DatePicker from "react-mobile-datepicker";
// import "react-mobile-datepicker/dist/react-mobile-datepicker.css"; // 존재할 경우만
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 이건 꼭 import 해야 합니다.
import { ko } from "date-fns/locale";


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

  const [previews, setPreviews] = useState([]); // 미리보기 배열
  const [files, setFiles] = useState([]); // 실제 파일 배열

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 최대 10개까지만 업로드 가능
    const totalFiles = files.length + selectedFiles.length;
    if (totalFiles > 10) {
      alert("최대 10장의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const newPreviews = [];
    const newFiles = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
      newFiles.push(file);
    });

    setFiles((prev) => [...prev, ...newFiles]);

    // input 초기화 (같은 파일 다시 선택 가능하게)
    e.target.value = null;
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {previews.length < 10 && (
          <label
            htmlFor="upload-image"
            style={{
              width: "150px",
              height: "150px",
              border: "2px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>이미지 추가</span>
          </label>
        )}
        {previews.map((src, index) => (
          <div
            key={index}
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid #ccc",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              alt={`미리보기-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <input
        id="upload-image"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <p style={{ marginTop: "10px" }}>{previews.length} / 10</p>
    </div>
  );

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
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <p>날짜 선택</p>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect // 시간을 보여줌
        timeIntervals={15} // 15분 단위
        dateFormat="yyyy.MM.dd (eee) HH:mm" // 원하는 포맷
        locale={ko} // 한국어 요일 등 적용
        placeholderText="날짜와 시간을 선택하세요"

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
