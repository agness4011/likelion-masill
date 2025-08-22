import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  addBoard,
  getRegionName,
  detailBoard,
  updateEvent,
  changeRegion,
} from "../../api/boardApi";

import BoardIcon from "../../assets/write/board.svg";
import MapIcon from "../../assets/write/map.svg";
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

export default function WriteBoard({ children }) {
  return <div>{children}</div>;
}

function Head() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const isEditMode = !!eventId;

  return (
    <HeadDiv>
      <BackBtn src={BackIcon} onClick={() => navigate(-1)} />
      <HeadTitle>{isEditMode ? "게시글 수정" : "게시글 작성"}</HeadTitle>
      <HeadBoardImg src={BoardIcon} />
    </HeadDiv>
  );
}
function Form({ children }) {
  return <Formdiv>{children}</Formdiv>;
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
function Reigon({ regionName, isEditMode, eventId, onBeforeChangeRegion }) {
  const navigate = useNavigate();

  const handleRegionClick = () => {
    try {
      onBeforeChangeRegion?.(); // 이동 전 드래프트 저장
    } catch {}
    // 돌아올 경로 저장
    localStorage.setItem("editPageReturnUrl", window.location.pathname);
    navigate("/board/reigon");
  };

  return (
    <div>
      <ErrorDiv>
        <TextStyle>지역</TextStyle>
      </ErrorDiv>
      <div>
        <ReigonInput>
          {regionName}
          <CancleBtn src={Cancle} onClick={handleRegionClick} />
        </ReigonInput>
      </div>
      <InputWrapper></InputWrapper>
    </div>
  );
}
function SetLocation({ location, setLocation, error, setTouched }) {
  // 선택된 지역 정보 가져오기
  const selectedRegion = localStorage.getItem("selectedRegion") || "";
  const selectedDistrict = localStorage.getItem("selectedDistrict") || "";

  return (
    <div>
      <ErrorDiv>
        <TextStyle>세부 장소</TextStyle>
      </ErrorDiv>

      <InputWrapper>
        <InputStyle
          type="text"
          placeholder={`${selectedRegion} ${selectedDistrict} 장소 입력`}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </InputWrapper>
      {selectedRegion && selectedDistrict && (
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            marginTop: "4px",
            paddingLeft: "4px",
          }}
        ></div>
      )}
    </div>
  );
}

function SelectCategory({
  selectedCategories,
  setSelectedCategories,
  error,
  setCategoryError,
}) {
  const categories = [
    "문화•예술",
    "야외활동",
    "플리마켓",
    "가게행사",
    "자원봉사",
    "축제",
    "교육",
    "기타",
  ];
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const containerRef = useRef(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategories((prev) => {
      // 이미 선택된 카테고리를 클릭하면 선택 해제
      if (prev.includes(cat)) {
        setCategoryError(""); // 에러 제거
        return [];
      }

      // 선택한 카테고리만 남기고 나머지는 해제
      setCategoryError(""); // 에러 제거
      return [cat];
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
            {/* {errors?.startDate && (
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
            {/* {errors?.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>} */}
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
          {/* {errors?.startTime && <ErrorMessage>{errors.startTime}</ErrorMessage>} */}

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
          {/* {errors?.endTime && <ErrorMessage>{errors.endTime}</ErrorMessage>} */}
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
  const { eventId } = useParams();
  const isEditMode = !!eventId;

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
  const [loading, setLoading] = useState(isEditMode);

  // ====== 드래프트 저장/복원 ======
  const DRAFT_KEY = "boardDraft";

  const saveDraft = React.useCallback(() => {
    const draft = {
      title,
      location,
      categories,
      content,
      startDate: startDate ? startDate.getTime() : null,
      endDate: endDate ? endDate.getTime() : null,
      startTime: startTime ? startTime.getTime() : null,
      endTime: endTime ? endTime.getTime() : null,
      regionId,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [
    title,
    location,
    categories,
    content,
    startDate,
    endDate,
    startTime,
    endTime,
    regionId,
  ]);

  const loadDraft = React.useCallback(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      if (d.title) setTitle(d.title);
      if (d.location) setLocation(d.location);
      if (Array.isArray(d.categories)) setCategories(d.categories);
      if (d.content) setContent(d.content);
      if (d.startDate) setStartDate(new Date(d.startDate));
      if (d.endDate) setEndDate(new Date(d.endDate));
      if (d.startTime) setStartTime(new Date(d.startTime));
      if (d.endTime) setEndTime(new Date(d.endTime));
      if (d.regionId) {
        setRegionId(d.regionId);
        getRegionName(d.regionId)
          .then(setRegionName)
          .catch(() => {});
      }
    } catch {}
  }, []);

  // 마운트 시: 수정 모드에서만 저장된 드래프트가 있으면 복원
  useEffect(() => {
    if (isEditMode) {
      loadDraft();
    }
  }, [loadDraft, isEditMode]);

  // 폼 값이 바뀔 때마다 자동 저장 (수정 모드에서만)
  useEffect(() => {
    if (isEditMode) {
      saveDraft();
    }
  }, [saveDraft, isEditMode]);

  // 수정 모드일 때 기존 게시글 데이터 로드
  useEffect(() => {
    if (isEditMode && eventId) {
      const fetchEventData = async () => {
        try {
          setLoading(true);
          const eventData = await detailBoard(eventId);

          console.log("=== 게시글 데이터 로드 ===");
          console.log("전체 데이터:", eventData);
          console.log("모든 키 확인:", Object.keys(eventData));
          console.log(
            "지역ID:",
            eventData.regionId,
            "타입:",
            typeof eventData.regionId
          );
          console.log(
            "지역ID 존재 여부:",
            eventData.regionId !== undefined && eventData.regionId !== null
          );
          console.log("region 객체 확인:", eventData.region);
          console.log("region.regionId 확인:", eventData.region?.regionId);
          console.log("regionId 필드 확인:", eventData.regionId);
          console.log("areaId 필드 확인:", eventData.areaId);
          console.log("locationId 필드 확인:", eventData.locationId);
          console.log("area 필드 확인:", eventData.area);
          console.log("location 필드 확인:", eventData.location);
          console.log("sido 필드 확인:", eventData.sido);
          console.log("sigungu 필드 확인:", eventData.sigungu);
          console.log("전체 데이터 상세:", JSON.stringify(eventData, null, 2));

          // 폼 데이터 설정
          setTitle(eventData.title || "");
          setLocation(eventData.location || "");
          setContent(eventData.content || "");

          // 카테고리 설정
          const REVERSE_CATEGORY_MAP = {
            CULTURE_ART: "문화•예술",
            FLEA_MARKET: "플리마켓",
            VOLUNTEER: "자원봉사",
            FESTIVAL: "축제",
            OUTDOOR_ACTIVITY: "야외활동",
            EDUCATION: "교육",
            ETC: "기타",
            STORE_EVENT: "가게행사",
          };

          if (eventData.eventType) {
            const categoryName = REVERSE_CATEGORY_MAP[eventData.eventType];
            if (categoryName) {
              setCategories([categoryName]);
            }
          }

          // 날짜/시간 설정
          if (eventData.startAt) {
            const startDateTime = new Date(eventData.startAt);
            setStartDate(startDateTime);
            setStartTime(startDateTime);
          }

          if (eventData.endAt) {
            const endDateTime = new Date(eventData.endAt);
            setEndDate(endDateTime);
            setEndTime(endDateTime);
          }

          // 지역 설정
          console.log("=== 지역 정보 설정 시작 ===");
          console.log("eventData.regionId 값:", eventData.regionId);
          console.log("eventData.regionId 타입:", typeof eventData.regionId);
          console.log("eventData.regionId가 truthy인가:", !!eventData.regionId);

          // 다양한 지역 ID 필드명 확인 (숫자 타입만 허용)
          // 백엔드에서 region 객체 안에 regionId를 반환하므로 이를 우선 확인
          const possibleRegionId =
            eventData.region?.regionId ||
            eventData.regionId ||
            eventData.region ||
            eventData.areaId ||
            eventData.locationId ||
            eventData.area;
          console.log("가능한 지역 ID:", possibleRegionId);

          if (
            possibleRegionId !== undefined &&
            possibleRegionId !== null &&
            !isNaN(Number(possibleRegionId))
          ) {
            console.log("=== 지역 정보 설정 ===");
            console.log(
              "사용할 지역 ID:",
              possibleRegionId,
              typeof possibleRegionId
            );
            setRegionId(possibleRegionId);

            // API로 지역 이름 가져오기
            const regionIdNum = parseInt(possibleRegionId);
            console.log("변환된 regionId:", regionIdNum);

            getRegionName(regionIdNum)
              .then((regionData) => {
                console.log("API로 가져온 지역:", regionData);
                setRegionName(regionData);
              })
              .catch((err) => {
                console.error("지역 이름 가져오기 실패:", err);
                console.log(
                  "지역 정보를 가져올 수 없습니다. 지역을 다시 선택해주세요."
                );
                setRegionName(null);
              });
          } else {
            console.log("eventData.regionId가 없음:", eventData.regionId);
            console.log(
              "regionId가 undefined/null이므로 지역 정보를 설정하지 않음"
            );

            // 서버에서 regionId를 반환하지 않는 문제가 있습니다.
            // 이는 서버 측 문제로, 게시글 생성 시 regionId가 저장되지 않았거나
            // 조회 시 regionId가 반환되지 않고 있습니다.
            console.log("⚠️ 서버 문제: regionId가 API 응답에 없습니다.");
            console.log("서버 개발자에게 다음을 확인 요청하세요:");
            console.log("1. 게시글 저장 시 regionId가 제대로 저장되는지");
            console.log("2. 게시글 조회 시 regionId가 응답에 포함되는지");

            // regionId가 없으면 기본값 설정하지 않음
            setRegionId(null);
            setRegionName(null);

            // 사용자에게 지역 재선택 안내
            console.log(
              "지역 정보가 없습니다. 사용자가 지역을 다시 선택해야 합니다."
            );
          }

          // 기존 이미지 설정
          if (eventData.images && eventData.images.length > 0) {
            const existingImageFiles = eventData.images.map((img, index) => ({
              file: null,
              preview: img.imageUrl,
              isExisting: true,
              imageId: img.sequence,
            }));
            setImages(existingImageFiles);
          }
        } catch (err) {
          console.error("게시글 데이터 로드 실패:", err);
          setFormError("게시글을 불러오는데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchEventData();
    }
  }, [isEditMode, eventId]);

  // 지역 선택에서 돌아온 경우를 감지
  useEffect(() => {
    const checkForRegionSelection = () => {
      const selectedRegion = localStorage.getItem("selectedRegion");
      const selectedDistrict = localStorage.getItem("selectedDistrict");
      const selectedRegionId = localStorage.getItem("selectedRegionId");
      const editPageReturnUrl = localStorage.getItem("editPageReturnUrl");

      // 지역 선택 정보가 있는 경우 (작성 모드와 수정 모드 모두)
      if (selectedRegion && selectedDistrict && selectedRegionId) {
        console.log("지역 선택 정보 발견!");
        console.log(
          "지역 정보 업데이트 실행:",
          selectedRegion,
          selectedDistrict,
          selectedRegionId
        );

        // 지역 정보 업데이트
        setRegionId(parseInt(selectedRegionId));
        setRegionName({ sido: selectedRegion, sigungu: selectedDistrict });

        console.log("지역 정보 업데이트 완료!");

        // 지역 정보 업데이트 후 localStorage 정리 (약간의 지연 후)
        setTimeout(() => {
          localStorage.removeItem("selectedRegion");
          localStorage.removeItem("selectedDistrict");
          localStorage.removeItem("selectedRegionId");
          localStorage.removeItem("editPageEventId");
          localStorage.removeItem("editPageReturnUrl");
          console.log("localStorage 정리 완료");
        }, 500);
      }
    };

    // 로딩이 완료된 후 지역 선택 감지 (한 번만 실행)
    if (!loading) {
      checkForRegionSelection();
    }
  }, [loading, isEditMode]);

  const CATEGORY_MAP = {
    "문화•예술": "CULTURE_ART",
    플리마켓: "FLEA_MARKET",
    자원봉사: "VOLUNTEER",
    축제: "FESTIVAL",
    야외활동: "OUTDOOR_ACTIVITY",
    교육: "EDUCATION",
    기타: "ETC",

    가게행사: "STORE_EVENT",
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

    if (!isEditMode && images.length === 0) {
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
      console.log("=== 폼 제출 시작 ===");
      console.log("현재 regionId:", regionId);
      console.log("현재 regionName:", regionName);

      if (!regionId) {
        setFormError("지역을 선택해주세요!");
        return;
      }

      // ✅ changeRegion 완료 후 저장 진행
      await changeRegion(regionId);

      const regionFullName = await getRegionName(regionId);
      console.log("API로 가져온 지역명:", regionFullName);

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

      if (isEditMode) {
        const result = await updateEvent(eventId, formData);
        console.log("수정 서버 응답:", result);
        alert("게시글이 성공적으로 수정되었습니다.");
        navigate(`/detail/${eventId}`);
      } else {
        const result = await addBoard(formData);
        console.log("작성 서버 응답:", result);
        navigate("/myhome/my-posts");
      }

      // 제출 성공 시 드래프트 정리
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error("저장 실패:", error);
      
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        stack: error.stack,
        name: error.name
      };
      
      console.error("에러 상세 정보:", errorDetails);
      
      // 모바일 디버깅을 위한 상세 오류 메시지
      let errorMessage = "서버 저장 중 오류가 발생했습니다.";
      
      if (error.response?.status === 400) {
        errorMessage = `입력 정보를 확인해주세요. (400 오류)\n상세: ${JSON.stringify(error.response?.data)}`;
      } else if (error.response?.status === 401) {
        errorMessage = "로그인이 필요합니다. (401 오류)";
      } else if (error.response?.status === 403) {
        errorMessage = "권한이 없습니다. (403 오류)";
      } else if (error.response?.status === 404) {
        errorMessage = "요청한 리소스를 찾을 수 없습니다. (404 오류)";
      } else if (error.response?.status === 500) {
        errorMessage = `서버 내부 오류가 발생했습니다. (500 오류)\n상세: ${JSON.stringify(error.response?.data)}`;
      } else if (error.response?.status === 502) {
        errorMessage = "서버 게이트웨이 오류가 발생했습니다. (502 오류)";
      } else if (error.response?.status === 503) {
        errorMessage = "서비스가 일시적으로 사용할 수 없습니다. (503 오류)";
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = "네트워크 연결을 확인해주세요.";
      } else if (error.message) {
        errorMessage = `오류: ${error.message}\n상세: ${JSON.stringify(errorDetails)}`;
      }
      
      // 모바일에서 확인할 수 있도록 상세 정보를 포함한 오류 메시지
      const debugMessage = `[디버그] 상태: ${error.response?.status || 'N/A'}, 메시지: ${error.message || 'N/A'}, URL: ${error.config?.url || 'N/A'}`;
      setFormError(`${errorMessage}\n\n${debugMessage}`);
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
      <Reigon
        regionName={
          regionName ? `${regionName.sido} ${regionName.sigungu}` : "지역 선택"
        }
        isEditMode={isEditMode}
        eventId={eventId}
        onBeforeChangeRegion={isEditMode ? saveDraft : undefined}
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
      <ErrorDiv>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </ErrorDiv>

      <SubmitBtn type="submit">
        {isEditMode ? "수정 완료" : "작성 완료"}
      </SubmitBtn>
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
WriteBoard.Reigon = Reigon;
