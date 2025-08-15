import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { addBoard } from "../../api/boardApi";

import BoardIcon from "../../assets/write/board.svg";
import MapIcon from "../../assets/write/map.svg";
import BackIcon from "../../assets/write/Arrow-Left.svg";
import ImageIcon from "../../assets/write/image-outline.png";
import leftBtn from "../../assets/write/Button.png";
import rightBtn from "../../assets/write/Button.png";

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
} from "./WriteBoard.styled";

export default function WriteBoard({ children }) {
  return <div>{children}</div>;
}

function SelectRegion() {}

function Head() {
  const navigate = useNavigate();
  return (
    <HeadDiv>
      <BackBtn src={BackIcon} onClick={() => navigate(-1)} />
      <HeadTitle>게시글 작성</HeadTitle>
      <HeadBoardImg src={BoardIcon} />
    </HeadDiv>
  );
}
function Form({ children }) {
  return <Formdiv>{children}</Formdiv>;
}
function SetTitle({ title, setTitle, error, setTouched }) {
  return (
    <div>
      <ErrorDiv>
        <TextStyle>제목</TextStyle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ErrorDiv>

      <InputStyle
        type="text"
        placeholder="이벤트 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
}

function SetLocation({ location, setLocation, error, setTouched }) {
  // 선택된 지역 정보 가져오기
  const selectedRegion = localStorage.getItem('selectedRegion') || '';
  const selectedDistrict = localStorage.getItem('selectedDistrict') || '';
  
  return (
    <div>
      <ErrorDiv>
        <TextStyle>장소</TextStyle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ErrorDiv>

      <InputWrapper>
        <InputStyle
          type="text"
          placeholder={`${selectedRegion} ${selectedDistrict} 장소 입력`}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <MapImg src={MapIcon} />
      </InputWrapper>
      {selectedRegion && selectedDistrict && (
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '4px',
          paddingLeft: '4px'
        }}>
          선택된 지역: {selectedRegion} {selectedDistrict}
        </div>
      )}
    </div>
  );
}

function SelectCategory({
  selectedCategories,
  setSelectedCategories,
  error,
  setTouched,
  setCategoryError,
}) {
  const categories = ["문화•예술", "야외활동", "플리마켓", "자원봉사", "축제"];
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const containerRef = useRef(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat];

      // 카테고리가 선택되면 에러 제거
      if (newSelection.length > 0) {
        setCategoryError(""); // <-- 부모에서 상태 업데이트
      }

      return newSelection;
    });
  };

  const scrollByAmount = 120;
  const scrollLeft = () =>
    containerRef.current?.scrollBy({
      left: -scrollByAmount,
      behavior: "smooth",
    });
  const scrollRight = () =>
    containerRef.current?.scrollBy({
      left: scrollByAmount,
      behavior: "smooth",
    });

  const checkButtonsVisibility = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftBtn(scrollLeft > 0);
    setShowRightBtn(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkButtonsVisibility);
    checkButtonsVisibility();
    return () => el.removeEventListener("scroll", checkButtonsVisibility);
  }, []);

  return (
    <Wrapper>
      <ErrorDiv>
        <TextStyle>카테고리</TextStyle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ErrorDiv>

      <CategoryArea>
        {showLeftBtn && (
          <LeftBtn src={leftBtn} onClick={scrollLeft} alt="왼쪽 이동" />
        )}
        <Categories ref={containerRef}>
          {categories.map((cat) => (
            <CategoryBtn
              key={cat}
              $isSelected={selectedCategories.includes(cat)}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </CategoryBtn>
          ))}
        </Categories>
        {showRightBtn && (
          <RightBtn src={rightBtn} onClick={scrollRight} alt="오른쪽 이동" />
        )}
      </CategoryArea>
    </Wrapper>
  );
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
            <UploadImgNum hasImage={images.length > 0}>
              {images.length}
            </UploadImgNum>
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
        {images.map((img, index) => (
          <PreviewBox key={index}>
            {index === 0 && <RepresentativeTag>대표 이미지</RepresentativeTag>}
            <RemoveBtn onClick={() => removeImage(index)}>X</RemoveBtn>
            <PreviewImg src={img.preview} alt={`미리보기-${index}`} />
          </PreviewBox>
        ))}
      </PreviewRight>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploadContainer>
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <TextArea
        placeholder="내용을 입력하세요..."
        value={content}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        maxLength={maxLength}
      />
      <CharCount>
        {content.length} / {maxLength}
      </CharCount>
    </DetailDiv>
  );
}

function EventDateTimePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  errors,
}) {
  const [modalConfig, setModalConfig] = useState({ open: false, type: null });

  const openModal = (type) => setModalConfig({ open: true, type });
  const closeModal = () => setModalConfig({ open: false, type: null });

  const handleSelect = (date) => {
    switch (modalConfig.type) {
      case "startDate":
        setStartDate(date);
        break;
      case "endDate":
        setEndDate(date);
        break;
      case "startTime":
        setStartTime(date);
        break;
      case "endTime":
        setEndTime(date);
        break;
      default:
        break;
    }
    closeModal();
  };

  const grayColor = "var(--Gray-700, #959EB7)";
  const blackColor = "#000000";

  return (
    <div>
      <div style={{ display: "flex", gap: "16px" }}>
        <DateDiv>
          <ErrorDiv>
            <TextStyle>시작 날짜</TextStyle>
            {errors?.startDate && (
              <ErrorMessage>{errors.startDate}</ErrorMessage>
            )}
          </ErrorDiv>
          <TimeInput
            style={{ color: startDate ? blackColor : grayColor }}
            onClick={() => openModal("startDate")}
          >
            {startDate ? startDate.toLocaleDateString() : "날짜 선택"}
          </TimeInput>
        </DateDiv>

        <DateDiv>
          <ErrorDiv>
            <TextStyle>종료 날짜</TextStyle>
            {errors?.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
          </ErrorDiv>
          <TimeInput
            style={{ color: endDate ? blackColor : grayColor }}
            onClick={() => openModal("endDate")}
          >
            {endDate ? endDate.toLocaleDateString() : "날짜 선택"}
          </TimeInput>
        </DateDiv>
      </div>

      <div>
        <TextStyle>행사 시간</TextStyle>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <TimeInput
            style={{ color: startTime ? blackColor : grayColor }}
            onClick={() => openModal("startTime")}
          >
            {startTime
              ? startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "시간 선택"}
          </TimeInput>
          {errors?.startTime && <ErrorMessage>{errors.startTime}</ErrorMessage>}

          <TimeInput
            style={{ color: endTime ? blackColor : grayColor }}
            onClick={() => openModal("endTime")}
          >
            {endTime
              ? endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "시간 선택"}
          </TimeInput>
          {errors?.endTime && <ErrorMessage>{errors.endTime}</ErrorMessage>}
        </div>
      </div>

      {modalConfig.open && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <DatePicker
              selected={
                modalConfig.type === "startDate"
                  ? startDate || new Date()
                  : modalConfig.type === "endDate"
                  ? endDate || new Date()
                  : modalConfig.type === "startTime"
                  ? startTime || new Date()
                  : modalConfig.type === "endTime"
                  ? endTime || new Date()
                  : null
              }
              onChange={handleSelect}
              inline
              showTimeSelect={modalConfig.type.includes("Time")}
              showTimeSelectOnly={modalConfig.type.includes("Time")}
              timeIntervals={10}
              dateFormat={
                modalConfig.type.includes("Date") ? "yyyy-MM-dd" : "HH:mm"
              }
            />
            <button onClick={closeModal} style={{ marginTop: "10px" }}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
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

  // --- 추가: 지역 선택 state ---
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedSigungu, setSelectedSigungu] = useState(null);

  const CATEGORY_MAP = {
    "문화•예술": "CULTURE_ART",
    플리마켓: "FLEA_MARKET",
    자원봉사: "VOLUNTEER",
    축제: "FESTIVAL",
    야외활동: "OUTDOOR",
    기타: "ETC",
  };

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

    return valid;
  };

  // --- handleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setFormError("");

    try {
      const regionData = 1;
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
        return (
          `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
          )}T` +
          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
          )}`
        );
      };

      const formData = new FormData();
      const payload = {
        regionId: regionData,
        eventType: CATEGORY_MAP[categories[0]],
        title,
        content,
        location,
        startAt: formatDateTimeLocal(startAt),
        endAt: formatDateTimeLocal(endAt),
      };
      console.log("payload:", payload);
      formData.append(
        "request", // ⬅️ 서버 @RequestPart 이름과 반드시 동일
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      images.forEach((img) => {
        const fileObj = img.file || img;
        if (fileObj instanceof File) {
          formData.append("images", fileObj);
        }
      });
      console.log("FormData 내용:");

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
      {/* 카테고리 선택 */}
      <SelectCategory
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        error={categoryError}
        setTouched={() => {}}
        setCategoryError={setCategoryError}
      />
      {/* 제목 */}
      <SetTitle
        title={title}
        setTitle={setTitle}
        error={titleError}
        setTouched={() => {}}
      />
      {/* 장소 */}
      <SetLocation
        location={location}
        setLocation={setLocation}
        error={locationError}
        setTouched={() => {}}
      />

      {/* 날짜/시간 */}
      <EventDateTimePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        errors={dateErrors}
      />
      {/* 내용 */}
      <WriteContext
        content={content}
        setContent={setContent}
        error={contentError}
        setTouched={() => {}}
      />
      {/* 에러 메시지 */}
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      <SubmitBtn type="submit">작성 완료</SubmitBtn>
    </form>
  );
}
WriteBoard.SubmitButton = SubmitButton;
WriteBoard.EventDateTimePicker = EventDateTimePicker;
WriteBoard.InputForm = InputForm;
WriteBoard.SelectCategory = SelectCategory;
WriteBoard.SelectRegion = SelectRegion;
WriteBoard.Form = Form;
WriteBoard.Head = Head;
WriteBoard.UploadImg = UploadImg;
WriteBoard.SetTitle = SetTitle;
WriteBoard.SetLocation = SetLocation;
WriteBoard.WriteContext = WriteContext;
