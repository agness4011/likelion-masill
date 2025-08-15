import { useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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
    const newSelection = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];

    setSelectedCategories(newSelection);

    // 카테고리 자체 에러만 초기화
    if (newSelection.length > 0) {
      setCategoryError("");
    }

    setTouched(true); // 카테고리 터치 상태만 true
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
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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

      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
    </UploadContainer>
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
            {/* {errors.startDate && (
              <ErrorMessage>{errors.startDate}</ErrorMessage>
            )} */}
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
            {/* {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>} */}
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
              : "시작 시간"}
          </TimeInput>
          {/* {errors.startTime && <ErrorMessage>{errors.startTime}</ErrorMessage>} */}

          <TimeInput
            style={{ color: endTime ? blackColor : grayColor }}
            onClick={() => openModal("endTime")}
          >
            {endTime
              ? endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "종료 시간"}
          </TimeInput>
          {/* {errors.endTime && <ErrorMessage>{errors.endTime}</ErrorMessage>} */}
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
                  : endTime || new Date()
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
function SubmitButton() {
  return (
    <div>
      <SubmitBtn>작성 완료</SubmitBtn>
    </div>
  );
}
// --- 최종 InputForm ---

function InputForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [titleError, setTitleError] = useState("");

  const [location, setLocation] = useState("");
  const [locationTouched, setLocationTouched] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const [images, setImages] = useState([]);
  const [imageTouched, setImageTouched] = useState(false);
  const [imageError, setImageError] = useState("");

  const [content, setContent] = useState("");
  const [contentTouched, setContentTouched] = useState(false);
  const [contentError, setContentError] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [dateErrors, setDateErrors] = useState({});

  const [formError, setFormError] = useState("");

  const validateForm = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("제목을 입력해주세요!");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!location.trim()) {
      setLocationError("장소를 입력해주세요!");
      valid = false;
    } else {
      setLocationError("");
    }

    if (categories.length === 0) {
      setCategoryError("카테고리를 선택해주세요!");
      valid = false;
    } else {
      setCategoryError("");
    }

    if (images.length === 0) {
      setImageError("사진을 추가해주세요!");
      valid = false;
    } else {
      setImageError("");
    }

    if (!content.trim()) {
      setContentError("내용을 입력해주세요!");
      valid = false;
    } else {
      setContentError("");
    }

    const newDateErrors = {};
    if (!startDate) newDateErrors.startDate = "시작 날짜를 선택해주세요!";
    if (!endDate) newDateErrors.endDate = "종료 날짜를 선택해주세요!";
    if (!startTime) newDateErrors.startTime = "시작 시간을 선택해주세요!";
    if (!endTime) newDateErrors.endTime = "종료 시간을 선택해주세요!";

    setDateErrors(newDateErrors);
    if (Object.keys(newDateErrors).length > 0) valid = false;

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setFormError("모든 항목을 기입해주세요!");
      return;
    }

    setFormError(""); // 모든 필드가 채워졌다면 에러 메시지 제거

    const formData = {
      title,
      location,
      categories,
      images,
      content,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    console.log("서버로 전송할 데이터:", formData);

    navigate("/main/event"); // 모든 필드 채워졌을 때 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 전체 폼 에러 메시지 */}

      <UploadImg
        images={images}
        setImages={setImages}
        error={imageError}
        setTouched={setImageTouched}
      />

      <SelectCategory
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        error={categoryError}
        setTouched={setCategoryTouched}
        setCategoryError={setCategoryError}
      />

      <SetTitle
        title={title}
        setTitle={setTitle}
        error={titleError}
        setTouched={setTitleTouched}
      />

      <SetLocation
        location={location}
        setLocation={setLocation}
        error={locationError}
        setTouched={setLocationTouched}
      />

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

      <WriteContext
        content={content}
        setContent={setContent}
        error={contentError}
        setTouched={setContentTouched}
      />
      {formError && (
        <ErrorMessage style={{ marginBottom: "16px" }}>
          {formError}
        </ErrorMessage>
      )}
      <SubmitBtn type="submit">작성 완료</SubmitBtn>
    </form>
  );
}

WriteBoard.SubmitButton = SubmitButton;
WriteBoard.EventDateTimePicker = EventDateTimePicker;
WriteBoard.InputForm = InputForm;
WriteBoard.SelectCategory = SelectCategory;
WriteBoard.Form = Form;
WriteBoard.Head = Head;
WriteBoard.UploadImg = UploadImg;
WriteBoard.SetTitle = SetTitle;
WriteBoard.SetLocation = SetLocation;
WriteBoard.WriteContext = WriteContext;
