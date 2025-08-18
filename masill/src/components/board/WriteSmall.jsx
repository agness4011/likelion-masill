import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { addBoard, getRegionName } from "../../api/boardApi";

import BoardIcon from "../../assets/write/board.svg";
import BackIcon from "../../assets/write/Arrow-Left.svg";
import ImageIcon from "../../assets/write/image-outline.png";
import leftBtn from "../../assets/write/Button.png";
import rightBtn from "../../assets/write/Button.png";
import Cancle from "../../assets/write/cancle.png";

import {
  BackBtn,
  HeadTitle,
  HeadDiv,
  Formdiv,
  UploadContainer,
  UploadLeft,
  UploadLabel,
  UploadImgIcon,
  UploadInput,
  PreviewRight,
  PreviewBox,
  PreviewImg,
  RemoveBtn,
  RepresentativeTag,
  UploadImgNum,
  TotalImgNum,
  DetailDiv,
  CategoryBtn,
  Wrapper,
  CategoryArea,
  Categories,
  LeftBtn,
  RightBtn,
  TextStyle,
  InputStyle,
  InputWrapper,
  MapImg,
  HeadBoardImg,
  TimeInput,
  TextArea,
  DateDiv,
  CharCount,
  SubmitBtn,
  ErrorMessage,
  ErrorDiv,
  overlayStyle,
  modalStyle,
  ReigonInput,
  CancleBtn,
  Div,
} from "./WriteBoard.styled";

export default function WriteSmall({ children }) {
  return <div>{children}</div>;
}

function Head() {
  const navigate = useNavigate();
  return (
    <HeadDiv>
      <BackBtn src={BackIcon} onClick={() => navigate(-1)} />
      <HeadTitle>게시글 작성</HeadTitle>
    </HeadDiv>
  );
}
function Form({ children }) {
  return <Formdiv>{children}</Formdiv>;
}
function UploadImg({ images, setImages, error, setTouched }) {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
    setTouched(true);
    e.target.value = "";
  };
  const imageCount = images?.length || 0;

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setTouched(true);
  };

  return (
    <UploadContainer>
      <UploadLeft>
        <UploadLabel htmlFor="imageUpload">
          <UploadImgIcon src={ImageIcon} />
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UploadImgNum hasImage={imageCount > 0}>{imageCount}</UploadImgNum>
            <TotalImgNum>/10</TotalImgNum>
          </div>
        </UploadLabel>
        <UploadInput
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </UploadLeft>

      <PreviewRight>
        <PreviewRight>
          {(images || []).map((img, index) => (
            <PreviewBox key={index}>
              {index === 0 && (
                <RepresentativeTag>대표 이미지</RepresentativeTag>
              )}
              <RemoveBtn onClick={() => removeImage(index)}>X</RemoveBtn>
              <PreviewImg src={img.preview} alt={`미리보기-${index}`} />
            </PreviewBox>
          ))}
        </PreviewRight>
      </PreviewRight>
      {/* 
      {error && <ErrorMessage>{error}</ErrorMessage>} */}
    </UploadContainer>
  );
}
function SetTitle({ title, setTitle, error, setTouched }) {
  return (
    <Div>
      <ErrorDiv>
        <TextStyle>제목</TextStyle>
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      </ErrorDiv>

      <InputStyle
        type="text"
        placeholder="이벤트 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
      />
    </Div>
  );
}

function SubmitButton() {
  return (
    <div>
      <SubmitBtn>작성 완료</SubmitBtn>
    </div>
  );
}
function WriteContext({ content, setContent, error, setTouched }) {
  const maxLength = 5000;
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) setContent(value);
    setTouched(true);
  };

  return (
    <DetailDiv>
      <TextStyle>내용</TextStyle>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      <TextArea
        placeholder="내용을 입력하세요..."
        value={content}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        maxLength={maxLength}
      />
      <CharCount>
        {(content || "").length} / {maxLength}
      </CharCount>
    </DetailDiv>
  );
}

// --- 최종 InputForm ---
function InputForm() {
  const navigate = useNavigate();

  // --- 기존 state ---
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [dateErrors, setDateErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [regionId, setRegionId] = useState(null);
  const [regionName, setRegionName] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedRegionId");
    const id = storedId ? parseInt(storedId, 10) : null;
    if (id) {
      setRegionId(id);
      getRegionName(id)
        .then(setRegionName)
        .catch((err) => console.error("지역 이름 불러오기 실패:", err));
    }
  }, []);

  // --- 유효성 검사 ---
  const validateForm = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("제목을 입력해주세요!");
      valid = false;
    } else setTitleError("");

    if (!location.trim()) {
      setLocationError("장소를 입력해주세요!");
      valid = false;
    } else setLocationError("");

    if (categories.length === 0) {
      setCategoryError("카테고리를 선택해주세요!");
      valid = false;
    } else setCategoryError("");

    if (images.length === 0) {
      setImageError("사진을 추가해주세요!");
      valid = false;
    } else setImageError("");

    if (!content.trim()) {
      setContentError("내용을 입력해주세요!");
      valid = false;
    } else setContentError("");

    const newDateErrors = {};
    if (!startDate) newDateErrors.startDate = "시작 날짜를 선택해주세요!";
    if (!endDate) newDateErrors.endDate = "종료 날짜를 선택해주세요!";
    if (!startTime) newDateErrors.startTime = "시작 시간을 선택해주세요!";
    if (!endTime) newDateErrors.endTime = "종료 시간을 선택해주세요!";
    setDateErrors(newDateErrors);

    if (Object.keys(newDateErrors).length > 0) valid = false;

    if (!valid) {
      setFormError("모든 항목을 기입해주세요!");
    } else {
      setFormError("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setFormError("");

    try {
      const regionFullName = await getRegionName(regionId);
      console.log(regionFullName);

      // 날짜 검증
      const startAt = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );
      const endAt = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );
      if (startAt > endAt) {
        setFormError("종료 시간은 시작 시간 이후여야 합니다.");
        return;
      }

      const formatDateTimeLocal = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
          date.getSeconds()
        )}`;
      };

      const formData = new FormData();
      const payload = {
        regionId: regionId,
        eventType: CATEGORY_MAP[categories[0]],
        title,
        content,
        location,
        startAt: formatDateTimeLocal(startAt),
        endAt: formatDateTimeLocal(endAt),
      };
      formData.append(
        "request",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      images.forEach((img) => {
        const fileObj = img.file || img;
        if (fileObj instanceof File) {
          formData.append("images", fileObj);
        }
      });

      const result = await addBoard(formData);
      console.log("서버 응답:", result);
      navigate("/main/event");
    } catch (error) {
      console.error("저장 실패:", error);
      setFormError("서버 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 이미지 업로드 */}
      <UploadImg
        images={images}
        setImages={setImages}
        error={imageError}
        setTouched={() => {}}
      />
      {/* 제목 */}
      <SetTitle
        title={title}
        setTitle={setTitle}
        error={titleError}
        setTouched={() => {}}
      />

      {/* 내용 */}
      <WriteContext
        content={content}
        setContent={setContent}
        error={contentError}
        setTouched={() => {}}
      />
      {/* 에러 메시지 */}
      <ErrorDiv>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </ErrorDiv>

      <SubmitBtn type="submit">작성 완료</SubmitBtn>
    </form>
  );
}
WriteSmall.SubmitButton = SubmitButton;
WriteSmall.InputForm = InputForm;

WriteSmall.Form = Form;
WriteSmall.Head = Head;
WriteSmall.UploadImg = UploadImg;
WriteSmall.SetTitle = SetTitle;

WriteSmall.WriteContext = WriteContext;
